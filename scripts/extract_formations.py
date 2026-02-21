#!/usr/bin/env python3
"""Extract individual formation boxes from page images and save to public/formations/."""

import os
import json
from PIL import Image

SRC_DIR = os.path.join(os.path.dirname(__file__), '..', 'formations')
DST_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'formations')

# Grid coordinates discovered by pixel analysis (1275x1650 pages)
ROWS = [(84, 462), (471, 849), (858, 1236), (1245, 1623)]
COLS = [(30, 612), (643, 1244)]
WHITE_THRESHOLD = 0.97  # regions above this fraction of white pixels are considered empty


def white_fraction(img, x1, y1, x2, y2):
    region = img.crop((x1, y1, x2, y2))
    pixels = list(region.getdata())
    white = sum(1 for p in pixels if p[0] >= 248 and p[1] >= 248 and p[2] >= 248)
    return white / len(pixels)


def extract_page_title(img):
    """Extract the page title color from the top-center region (tan/gold text)."""
    # Title is in the top ~80px, centered. We can't read it without OCR,
    # so return None and let the caller supply the name.
    return None


def main():
    os.makedirs(DST_DIR, exist_ok=True)

    pages = sorted(f for f in os.listdir(SRC_DIR) if f.endswith('.png'))
    if not pages:
        print(f"No PNG files found in {SRC_DIR}")
        return

    manifest = []
    counter = 0

    for page_file in pages:
        page_path = os.path.join(SRC_DIR, page_file)
        img = Image.open(page_path).convert('RGB')
        W, H = img.size
        print(f"\nProcessing {page_file} ({W}x{H})...")

        for row_idx, (y1, y2) in enumerate(ROWS):
            for col_idx, (x1, x2) in enumerate(COLS):
                frac = white_fraction(img, x1, y1, x2, y2)
                if frac >= WHITE_THRESHOLD:
                    print(f"  Skip row={row_idx} col={col_idx} (empty, {frac:.3f} white)")
                    continue

                counter += 1
                filename = f'formation_{counter:03d}.png'
                out_path = os.path.join(DST_DIR, filename)

                crop = img.crop((x1, y1, x2, y2))
                crop.save(out_path)

                manifest.append({
                    'filename': filename,
                    'imageUrl': f'/formations/{filename}',
                    'page': page_file,
                    'row': row_idx,
                    'col': col_idx,
                })
                print(f"  Saved {filename}  row={row_idx} col={col_idx}")

    print(f"\nDone. Extracted {len(manifest)} formations.")

    manifest_path = os.path.join(os.path.dirname(__file__), '..', 'formations_manifest.json')
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    print(f"Manifest saved to formations_manifest.json")


if __name__ == '__main__':
    main()
