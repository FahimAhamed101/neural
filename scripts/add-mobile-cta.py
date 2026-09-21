"""Add StickyMobileCta to every page that already renders the floating
WhatsApp button but not the mobile action bar.

On phones the floating stack is hidden, so any page without StickyMobileCta had
no persistent contact action at all. On a conversion-focused site that is the
difference between a visitor and a lead.
"""

import io
import re
import glob

IMPORT_ANCHOR = 'import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";'
IMPORT_LINE = 'import StickyMobileCta from "@/components/StickyMobileCta";'
USAGE = "<WhatsAppFloatingButton />"

changed = []

for path in glob.glob("app/**/*.tsx", recursive=True):
    source = io.open(path, encoding="utf-8").read()

    if IMPORT_ANCHOR not in source:
        continue
    if "StickyMobileCta" in source:
        continue

    updated = source.replace(IMPORT_ANCHOR, IMPORT_ANCHOR + "\n" + IMPORT_LINE, 1)

    # Match the usage plus its own indentation so the inserted line lines up.
    def add_after(match):
        indent = match.group(1)
        return f"{indent}{USAGE}\n{indent}<StickyMobileCta />"

    updated, count = re.subn(
        r"(?m)^([ \t]*)<WhatsAppFloatingButton />$", add_after, updated
    )

    if count == 0:
        print("SKIP (no usage match): %s" % path)
        continue

    io.open(path, "w", encoding="utf-8", newline="\n").write(updated)
    changed.append((path, count))

for path, count in changed:
    print("updated %-40s (%d usage)" % (path, count))

print("\ntotal files updated:", len(changed))
