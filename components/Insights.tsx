import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";

const artClasses = ["art-one", "art-two", "art-three"];

export default function Insights() {
  const posts = getPublishedPosts().slice(0, 3);

  return (
    <section id="insights" className="insights section-pad">
      <div className="section-head">
        <div>
          <p className="kicker">Blogs &amp; news</p>
          <h2>Insights &amp; stories</h2>
        </div>
        <Link className="text-link" href="/blog">Explore more <span>↗</span></Link>
      </div>
      {posts.length ? (
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article key={post.id}>
              <Link className="insight-card-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                <div className={`blog-art ${artClasses[index]}`}><i /></div>
                <p>{post.kind === "news" ? "Industry update" : post.category} · {post.readingMinutes} min</p>
                <h3>{post.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-posts">
          <h3>New insights are being prepared.</h3>
          <p>Visit the insights page to see new articles as soon as they are published.</p>
          <Link href="/blog" className="text-link">View insights <span>↗</span></Link>
        </div>
      )}
    </section>
  );
}
