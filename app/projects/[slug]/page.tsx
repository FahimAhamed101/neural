import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { formatProjectDescription, formatProjectTitle, getProjectBySlug, getProjectSlug, getProjects } from "@/lib/projects";
import { getWhatsAppLink, siteConfig } from "@/lib/site-config";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

function splitList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function projectType(title: string, categories: string[]) {
  const value = `${title} ${categories.join(" ")}`.toLowerCase();
  if (/flutter|react-native|kotlin|android|ios/.test(value)) return "Mobile application";
  if (/shop|store|ecommerce|e-commerce/.test(value)) return "Ecommerce platform";
  if (/chat|crud|dashboard|admin/.test(value)) return "Web application";
  return "Digital product";
}

function liveProjectUrl(value: string) {
  if (!/^https?:\/\//i.test(value) || /github\.com/i.test(value)) return "";
  return value;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };
  const title = formatProjectTitle(project.title);
  const description = formatProjectDescription(project.description);
  const image = splitList(project.images)[0] || "/og-image.png";
  const url = `/projects/${getProjectSlug(project)}`;
  return {
    title: { absolute: `${title} Project Case Study | ${siteConfig.name}` },
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${title} project case study`, description, images: [image] },
    twitter: { card: "summary_large_image", title: `${title} project case study`, description, images: [image] },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();
  const allProjects = await getProjects();
  const title = formatProjectTitle(project.title);
  const description = formatProjectDescription(project.description);
  const technologies = splitList(project.category);
  const images = splitList(project.images);
  const type = projectType(title, technologies);
  const liveUrl = liveProjectUrl(project.link);
  const featuredImage = images[0];
  const galleryImages = images.slice(1);
  const pageUrl = `${siteConfig.url}/projects/${getProjectSlug(project)}`;
  const related = allProjects.filter((item) => item.id !== project.id && item.images).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: title,
        description,
        url: pageUrl,
        image: images,
        creator: { "@id": `${siteConfig.url}/#organization` },
        keywords: technologies.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${siteConfig.url}/#projects` },
          { "@type": "ListItem", position: 3, name: title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="project-page">
        <article>
          <header className="project-detail-hero">
            <nav className="project-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#projects">Portfolio</Link><span>/</span><span>{title}</span></nav>
            <div className="project-hero-grid"><div><div className="project-detail-labels"><span>Selected work</span><span>{type}</span></div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="button-row">
              <a className="pill pill-lime" href={getWhatsAppLink(`Hi, I viewed the ${title} project and would like to discuss something similar.`)} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Build something similar <span>↗</span></a>
              <a className="pill pill-fiverr" href={siteConfig.fiverrUrl} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Hire us on Fiverr <span>↗</span></a>
              {liveUrl ? <a className="pill pill-outline" href={liveUrl} target="_blank" rel="noopener noreferrer">Visit live project <span>↗</span></a> : null}
            </div></div><dl className="project-quick-facts"><div><dt>Product</dt><dd>{type}</dd></div><div><dt>Expertise</dt><dd>{technologies.slice(0, 3).join(", ")}</dd></div><div><dt>Gallery</dt><dd>{images.length} curated view{images.length === 1 ? "" : "s"}</dd></div><div><dt>Studio</dt><dd>{siteConfig.name}</dd></div></dl></div>
          </header>

          {featuredImage ? <section className="project-showcase"><div className="project-showcase-frame"><span className="project-window-bar"><i /><i /><i /><b>Project preview</b></span><img src={featuredImage} alt={`${title} featured project interface`} /></div><div className="project-showcase-caption"><span>01 / {String(images.length).padStart(2, "0")}</span><p>Featured interface</p></div></section> : null}

          <section className="project-overview">
            <div><p className="kicker">Project brief</p><h2>Designed as a complete, usable product experience</h2><p>{description}</p><p>The gallery below presents the product interface and key screens delivered for this project. The experience was shaped around clear navigation, consistent interaction patterns, and a technology stack suited to the application.</p></div>
            <aside><p className="kicker">Project details</p><dl><div><dt>Category</dt><dd>{type}</dd></div><div><dt>Technology</dt><dd>{technologies.length} tools</dd></div><div><dt>Interface views</dt><dd>{images.length}</dd></div></dl><div className="project-tech-list">{technologies.map((item) => <span key={item}>{item}</span>)}</div><a href={getWhatsAppLink(`Hi, I viewed the ${title} case study and would like a project estimate.`)} target="_blank" rel="noopener noreferrer" data-google-ads-conversion>Request a similar project <span>↗</span></a></aside>
          </section>

          {galleryImages.length ? <section className="project-gallery-section"><div className="project-gallery-heading"><div><p className="kicker">Product gallery</p><h2>Interface details and key screens</h2></div><p>Explore the product through a curated selection of screens from the completed experience.</p></div><div className="project-gallery" aria-label={`${title} screenshots`}>{galleryImages.map((image, index) => <figure key={image}><div><img src={image} alt={`${title} project screen ${index + 2}`} loading="lazy" /></div><figcaption><span>{String(index + 2).padStart(2, "0")}</span><p>{title} interface</p></figcaption></figure>)}</div></section> : null}

          {related.length ? <section className="related-projects section-pad"><div className="section-head"><div><p className="kicker">More selected work</p><h2>Continue exploring</h2></div><Link className="text-link" href="/#projects">Back to portfolio <span>↗</span></Link></div><div>{related.map((item) => { const image = splitList(item.images)[0]; const relatedTitle = formatProjectTitle(item.title); return <article key={item.id}><Link href={`/projects/${getProjectSlug(item)}`}><div><img src={image} alt={`${relatedTitle} project preview`} loading="lazy" /><i>View case study ↗</i></div><span>{relatedTitle}<small>{projectType(relatedTitle, splitList(item.category))}</small></span></Link></article>; })}</div></section> : null}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
