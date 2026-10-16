"""Import the complete approved booklet from its source project, without rewriting prose.

Usage: python scripts/import-evolutionary-psychology.py <book-project-directory>
Requires pymupdf and reportlab. Run from the portfolio root.
"""
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

import pymupdf
from reportlab.graphics import renderPDF
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

source = Path(sys.argv[1]).resolve()
slug = "evolutionary-psychology-minds-in-a-changing-world"
assets = Path("public/assets/journal") / slug
assets.mkdir(parents=True, exist_ok=True)
pdf = source / "output/pdf/evolutionary_psychology_minds_in_a_changing_world.pdf"
verification = json.loads((source / "output/pdf/verification.json").read_text(encoding="utf-8"))
assert hashlib.sha256(pdf.read_bytes()).hexdigest() == verification["sha256"]
shutil.copyfile(pdf, assets / "booklet.pdf")
document = pymupdf.open(pdf)
assert len(document) == 250
sys.path.insert(0, str(source / "scripts"))
from book_figures import FIGURES

for name, filename in [("Georgia", "georgia.ttf"), ("Georgia-Bold", "georgiab.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
for key, (factory, caption) in FIGURES.items():
    diagram = pymupdf.open(stream=renderPDF.drawToString(factory()), filetype="pdf")
    diagram[0].get_pixmap(matrix=pymupdf.Matrix(3, 3), alpha=False).save(str(assets / (key + ".png")))

files = sorted((source / "manuscript").glob("[0-9][0-9]_*.md")) + sorted((source / "endmatter").glob("[0-9][0-9]_*.md"))
originals = [p.read_text(encoding="utf-8").strip() for p in files]
alltext = "\n\n".join(originals)
sources = {s["id"]: s for s in json.loads((source / "research/sources.json").read_text(encoding="utf-8"))}
cited = sorted(set(re.findall(r"@([A-Za-z0-9_]+)", alltext)), key=lambda k: (sources[k].get("authors") or k, sources[k].get("year") or ""))
numbers = {key: i + 1 for i, key in enumerate(cited)}
def url(key):
    s = sources[key]
    return "https://doi.org/" + s["doi"] if s.get("doi") else s.get("url") or ("https://pmc.ncbi.nlm.nih.gov/articles/" + s["pmcid"] + "/" if s.get("pmcid") else "")

def convert(text):
    text = re.sub(r"^(#{1,3}) ", r"#\1 ", text, flags=re.M)
    text = re.sub(r"\[@[^\]]+\]", lambda m: "(" + "; ".join(f"[{numbers[k]}]({url(k)})" for k in re.findall(r"@([A-Za-z0-9_]+)", m.group())) + ")", text)
    for key, (_, caption) in FIGURES.items():
        text = text.replace("[[figure:" + key + "]]", f"![{caption}](/assets/journal/{slug}/{key}.png)\n\n*{caption}*")
    return text

# Read front matter from the exact PDF edition, excluding running header and folio.
about = document[1].get_text("blocks", clip=pymupdf.Rect(40, 40, 395, 606))
front = "\n\n".join(" ".join(b[4].split()) for b in about)
front = front.replace("About this book", "## About this book", 1)
intro = "From foundational principles to advanced evidence and debate\n\nAn illustrated conceptual guide with modern-day examples"
content = intro + "\n\n" + front + "\n\n" + "\n\n".join(convert(s) for s in originals)

# Link the complete example index to the generated heading IDs used by the website.
headings = re.findall(r"^#{1,6} (.+)$", content, re.M)
examples = [(i + 1, title) for i, title in enumerate(headings) if title.startswith("Example ")]
content += "\n\n## Example index\n\nEach entry links to its numbered teaching scenario in this web edition.\n\n"
content += "\n".join(f"- [{title}](#section-{i})" for i, title in examples)
content += "\n\n## References\n\n"
for key in cited:
    s = sources[key]
    authors = s.get("authors") or ""
    if len(authors) > 260:
        authors = authors.split(",")[0] + ", et al."
    title = re.sub(r"<[^>]+>", "", s["title"])
    content += f"{numbers[key]}. {authors} ({s['year']}). {title}"
    if s.get("retracted"):
        content += " **RETRACTED: discussed only as a research-methods case.**"
    if url(key):
        content += f" [{url(key)}]({url(key)})"
    content += "\n\n"

frontmatter = f'''---
title: "Evolutionary Psychology: Minds in a Changing World"
date: "2026-10-16"
draft: false
excerpt: "The complete 250-page booklet: 32 chapters exploring mind, behavior, culture, and evolutionary reasoning, with 128 teaching examples and 120 references."
byline: "Shared by Arnav Goyal · Research and writing prepared with OpenAI Codex"
booklet: "/assets/journal/{slug}/booklet.pdf"
toc: true
---

'''
assert len(examples) == 128 and len(cited) == 120 and len(files) == 36
assert not re.search(r"\[@|\[\[figure:", content)
Path(f"src/content/posts/{slug}.md").write_text(frontmatter + content + "\n", encoding="utf-8")
print(f"Imported {len(files)} chapters/appendices, {len(examples)} examples, {len(cited)} references, 2 figures, and the original 250-page PDF.")
