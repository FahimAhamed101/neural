"""One-off: replace the duplicated/conflicting portfolio block at the end of
globals.css with a single clean source of truth.

The removed block redefined .section-head, .project-card, .project-media,
.project-tags, .project-index, .project-meta and .project-action, all of which
are also declared in reference.css (loaded later) and project.css. Properties
that reference.css does not declare were leaking through from the stale rules,
which is what produced the mismatched 16/10 vs 2/1 media ratio and the stray
border under every dark portfolio card.

It also contained a prefers-color-scheme:dark block. The site is a light-only
design, so that block made the portfolio look different depending on the
visitor's OS setting.
"""

import io

path = "app/globals.css"
source = io.open(path, encoding="utf-8").read()

marker = "/* =========================================\n   PROJECTS / PORTFOLIO"
index = source.find(marker)
if index < 0:
    raise SystemExit("marker not found - aborting so nothing is corrupted")

new_tail = """/* =========================================================
   PORTFOLIO LAYOUT
   Visual styling for cards, media, tags and meta is owned by
   reference.css (base look) and project.css (detail pages).
   This block owns only the properties those files do not
   declare, so every property has exactly one source of truth
   and there are no cross-file override fights.
========================================================= */

.section-head .kicker {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-head h2 {
  max-width: 700px;
}

.project-count {
  flex-shrink: 0;
}

/* 3 columns reads better than 4 here: each card carries an image,
   two tags, a title, a three-line description and a link. */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px 26px;
  width: 100%;
}

.project-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.project-meta > div {
  width: 100%;
  flex: 1;
}

.project-meta p {
  margin: 0 0 7px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.5;
}

.project-meta h3 a {
  color: inherit;
  text-decoration: none;
}

.project-meta h3 a:hover {
  opacity: 0.75;
}

.project-meta small {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* "View project" link. Declared only here, so it must stay. */
.project-action {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: fit-content;
  margin-top: 18px;
  padding: 0 0 4px;
  border: 0;
  border-bottom: 1px solid currentColor;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0.7;
  transition: opacity 0.2s ease, gap 0.2s ease;
}

.project-action span {
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.project-action:hover {
  gap: 9px;
  opacity: 1;
}

.project-action:hover span {
  transform: translate(2px, -2px);
}

@media (max-width: 1100px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px 20px;
  }
}

@media (max-width: 700px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 38px;
  }
}
"""

io.open(path, "w", encoding="utf-8", newline="\n").write(source[:index] + new_tail)
print("globals.css rewritten: %d chars -> %d chars" % (len(source), len(source[:index]) + len(new_tail)))
