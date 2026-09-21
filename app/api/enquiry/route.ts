import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

type EnquiryBody = {
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  service?: string;
  budget?: string;
  message?: string;
  /** Honeypot. Real users never fill this in. */
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function buildPlainText(fields: {
  name: string;
  email: string;
  company: string;
  country: string;
  service: string;
  budget: string;
  message: string;
}) {
  return [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : null,
    fields.country ? `Country: ${fields.country}` : null,
    fields.service ? `Service needed: ${fields.service}` : null,
    fields.budget ? `Budget: ${fields.budget}` : null,
    "",
    "Project details:",
    fields.message,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Lead capture endpoint.
 *
 * Transport is optional and resolved at runtime, in this order:
 *   1. RESEND_API_KEY + ENQUIRY_FROM_EMAIL  -> sent by email via the Resend REST API
 *   2. ENQUIRY_WEBHOOK_URL                  -> forwarded as JSON to any webhook
 *   3. neither configured                   -> returns delivered:false together with
 *      ready-made mailto and WhatsApp links so the client can hand the enquiry
 *      to the visitor's own mail app or WhatsApp instead of losing the lead.
 *
 * Nothing is written to a database, by design.
 */
export async function POST(request: Request) {
  let body: EnquiryBody;

  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }

  // Silently accept and drop bot submissions so they do not retry.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const fields = {
    name: clean(body.name, 120),
    email: clean(body.email, 180),
    company: clean(body.company, 160),
    country: clean(body.country, 90),
    service: clean(body.service, 120),
    budget: clean(body.budget, 60),
    message: clean(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (fields.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(fields.email)) errors.email = "Please enter a valid email address.";
  if (fields.message.length < 20) {
    errors.message = "Please add at least a sentence about the project.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const plainText = buildPlainText(fields);
  const subject = `New enquiry from ${fields.name}${fields.country ? ` (${fields.country})` : ""}`;

  const mailto =
    `mailto:${siteConfig.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(plainText)}`;

  const whatsapp =
    `https://wa.me/${siteConfig.whatsappNumber}` +
    `?text=${encodeURIComponent(`${subject}\n\n${plainText}`)}`;

  // --- Transport 1: Resend -------------------------------------------------
  const resendKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.ENQUIRY_FROM_EMAIL;
  const toAddress = process.env.ENQUIRY_TO_EMAIL || siteConfig.email;

  if (resendKey && fromAddress) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toAddress],
          reply_to: fields.email,
          subject,
          text: plainText,
        }),
      });

      if (response.ok) {
        return NextResponse.json({ ok: true, delivered: true, channel: "email" });
      }
    } catch {
      // Fall through to the handoff below rather than losing the enquiry.
    }
  }

  // --- Transport 2: generic webhook ---------------------------------------
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, subject, receivedAt: new Date().toISOString() }),
      });

      if (response.ok) {
        return NextResponse.json({ ok: true, delivered: true, channel: "webhook" });
      }
    } catch {
      // Fall through to the handoff below.
    }
  }

  // --- Transport 3: hand off to the visitor's own client -------------------
  // Reaching this branch means the enquiry was NOT delivered to the site owner
  // automatically — the visitor has to finish the send themselves, and many
  // will not. It is logged loudly on every submission so the misconfiguration
  // is visible in the server output instead of silently costing leads.
  console.warn(
    "[enquiry] NO TRANSPORT CONFIGURED — enquiry from %s (%s) was NOT delivered. " +
      "Set RESEND_API_KEY + ENQUIRY_FROM_EMAIL (or ENQUIRY_WEBHOOK_URL) to receive " +
      "enquiries automatically. Falling back to a WhatsApp/email handoff.",
    fields.email,
    fields.country || "country unknown"
  );

  return NextResponse.json({
    ok: true,
    delivered: false,
    reason: "no-transport-configured",
    subject,
    mailto,
    whatsapp,
  });
}
