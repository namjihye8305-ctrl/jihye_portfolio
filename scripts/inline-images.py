#!/usr/bin/env python3
"""Inline local image files into HTML as base64 data URLs.

Usage:
  python scripts/inline-images.py jihye_portfolio.html

This converts <img src="..."> references for local files into inline base64 data URLs.
"""

import base64
import mimetypes
import re
from pathlib import Path
import sys

IMG_SRC_RE = re.compile(r'(<img\b[^>]*?\bsrc=)(["\"])(?!data:|https?://|//)([^"\']+)(["\"])', flags=re.IGNORECASE)

SUPPORTED_EXTENSIONS = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
}


def guess_mime(path: Path) -> str:
    ext = path.suffix.lower()
    if ext in SUPPORTED_EXTENSIONS:
        return SUPPORTED_EXTENSIONS[ext]
    mimetype, _ = mimetypes.guess_type(path.name)
    return mimetype or 'application/octet-stream'


def inline_images(html_path: Path) -> int:
    html = html_path.read_text(encoding='utf-8')
    base_dir = html_path.parent
    replaced = 0

    def repl(match):
        nonlocal replaced
        prefix, quote, src, suffix = match.groups()
        image_path = (base_dir / src).resolve()
        if not image_path.exists() or not image_path.is_file():
            return match.group(0)
        mime = guess_mime(image_path)
        data = base64.b64encode(image_path.read_bytes()).decode('ascii')
        replaced += 1
        return f'{prefix}{quote}data:{mime};base64,{data}{quote}'

    html_out = IMG_SRC_RE.sub(repl, html)
    if replaced:
        html_path.write_text(html_out, encoding='utf-8')
    return replaced


def main(argv=None) -> int:
    argv = argv or sys.argv[1:]
    if not argv:
        print('Usage: python scripts/inline-images.py <file.html> [more.html ...]')
        return 1

    total = 0
    for path_text in argv:
        html_path = Path(path_text)
        if not html_path.exists():
            print(f'Skipping missing file: {html_path}')
            continue
        count = inline_images(html_path)
        print(f'Inlined {count} image(s) into {html_path}')
        total += count
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
