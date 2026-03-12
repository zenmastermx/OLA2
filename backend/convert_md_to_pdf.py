#!/usr/bin/env python3
"""Convert Markdown to styled PDF using WeasyPrint."""

import markdown
from weasyprint import HTML
import sys
import os

def convert_md_to_pdf(md_path, pdf_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()

    html_body = markdown.markdown(
        md_content,
        extensions=['tables', 'fenced_code', 'toc', 'sane_lists']
    )

    full_html = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {{
    size: A4;
    margin: 2cm 2.2cm;
    @bottom-center {{
      content: "Page " counter(page) " of " counter(pages);
      font-size: 9px;
      color: #666;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }}
    @top-right {{
      content: "USAHS OLA 2.0 — Ask Journey User Stories";
      font-size: 8px;
      color: #999;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }}
  }}
  body {{
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 10.5px;
    line-height: 1.55;
    color: #1a1a1a;
    max-width: 100%;
  }}
  h1 {{
    color: #00677F;
    font-size: 22px;
    border-bottom: 3px solid #00677F;
    padding-bottom: 6px;
    margin-top: 32px;
    margin-bottom: 14px;
    page-break-after: avoid;
    font-weight: 700;
    letter-spacing: -0.3px;
  }}
  h2 {{
    color: #2c3e50;
    font-size: 15px;
    margin-top: 24px;
    margin-bottom: 10px;
    page-break-after: avoid;
    font-weight: 700;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 4px;
  }}
  h3 {{
    color: #00677F;
    font-size: 13px;
    margin-top: 18px;
    margin-bottom: 8px;
    font-weight: 600;
  }}
  h4 {{
    color: #555;
    font-size: 11.5px;
    margin-top: 12px;
    margin-bottom: 6px;
    font-weight: 600;
  }}
  p {{
    margin: 6px 0;
    text-align: left;
  }}
  strong {{
    color: #1a1a1a;
    font-weight: 700;
  }}
  ul, ol {{
    margin: 6px 0 6px 20px;
    padding-left: 8px;
  }}
  li {{
    margin-bottom: 3px;
    line-height: 1.5;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 9.5px;
    page-break-inside: auto;
  }}
  thead {{
    background: #00677F;
    color: white;
  }}
  th {{
    padding: 7px 10px;
    text-align: left;
    font-weight: 600;
    font-size: 9.5px;
    border: 1px solid #00677F;
  }}
  td {{
    padding: 6px 10px;
    border: 1px solid #ddd;
    vertical-align: top;
  }}
  tr:nth-child(even) {{
    background-color: #f8fafb;
  }}
  tr {{
    page-break-inside: avoid;
  }}
  hr {{
    border: none;
    border-top: 1px solid #ccc;
    margin: 20px 0;
  }}
  code {{
    background: #f0f4f8;
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 9.5px;
    font-family: 'Courier New', monospace;
    color: #c7254e;
  }}
  blockquote {{
    border-left: 3px solid #00677F;
    margin: 10px 0;
    padding: 6px 14px;
    background: #f8fafb;
    color: #444;
  }}
  .title-page {{
    text-align: center;
    padding-top: 180px;
  }}
  input[type="checkbox"] {{
    margin-right: 5px;
  }}
</style>
</head>
<body>
{html_body}
</body>
</html>"""

    HTML(string=full_html).write_pdf(pdf_path)
    print(f"PDF generated: {pdf_path}")

if __name__ == "__main__":
    md_file = sys.argv[1] if len(sys.argv) > 1 else "/app/memory/SALESFORCE_ASK_JOURNEY_USER_STORIES.md"
    pdf_file = sys.argv[2] if len(sys.argv) > 2 else md_file.replace('.md', '.pdf')
    convert_md_to_pdf(md_file, pdf_file)
