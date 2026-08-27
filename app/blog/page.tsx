import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website and App Development & Repair Guides",
  description: "Practical guides for fixing, redesigning, planning, and developing websites, web apps, mobile apps, ecommerce stores, and business software.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Website and App Development Guides | Neural IT Limited", description: "Practical guidance for fixing broken websites and planning better websites, apps, ecommerce, and business software.", url: "/blog", type: "website" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <><Header /><main className="blog-page"><section className="blog-hero"><p className="kicker">Practical development guides</p><h1>Fix what is broken. Plan what comes next.</h1><p>Clear guidance for business owners deciding how to repair, redesign, or develop a website, web app, mobile app, ecommerce store, or custom software product with {siteConfig.name}.</p></section><section className="blog-listing" aria-labelledby="latest-articles"><div className="blog-listing-head"><div><p className="kicker">Solve a real product problem</p><h2 id="latest-articles">Website and app resources</h2></div><span>{posts.length} published</span></div>{posts.length ? <div className="post-grid">{posts.map((post, index) => <article className="post-card" key={post.id}><Link href={`/blog/${post.slug}`} className={`post-card-art art-${(index % 3) + 1}`} aria-label={`Read ${post.title}`}><span>{post.kind === "news" ? "Industry update" : post.category}</span><b>{String(index + 1).padStart(2, "0")}</b></Link><div className="post-card-body"><div className="post-meta"><span>{new Date(post.publishedAt).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span><span>{post.readingMinutes} min read</span></div><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.description}</p><Link className="post-read-link" href={`/blog/${post.slug}`}>Read guide <span>↗</span></Link></div></article>)}</div> : <div className="empty-posts"><h3>New insights are being prepared.</h3><p>The content worker will publish articles here after they pass the editorial quality checks.</p><Link href="/#contact" className="pill pill-lime">Discuss your project <span>↗</span></Link></div>}</section></main><Footer /><WhatsAppFloatingButton /></>;
}
