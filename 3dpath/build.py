"""Build a single 3dPath.exe (no Node or Python needed for learners)."""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def _ensure_icon() -> Path:
    path = ROOT / "packaging" / "3dpath.ico"
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_file():
        return path
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new("RGBA", (256, 256), (12, 14, 18, 255))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((18, 18, 238, 238), radius=36, fill=(228, 165, 74, 255))
    try:
        font = ImageFont.truetype("arialbd.ttf", 92)
    except OSError:
        font = ImageFont.load_default()
    text = "3d"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((256 - tw) / 2, (256 - th) / 2 - 8), text, font=font, fill=(12, 14, 18, 255))
    img.save(path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
    return path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--skip-npm", action="store_true", help="Use existing dist/index.html")
    args = parser.parse_args()

    html = ROOT / "dist" / "index.html"
    if not args.skip_npm or not html.is_file():
        npm = shutil.which("npm")
        if not npm:
            raise SystemExit("npm is missing. Install Node, then run python build.py.")
        subprocess.check_call([npm, "run", "build"], cwd=ROOT)
    if not html.is_file():
        raise SystemExit("dist\\index.html is missing. npm run build failed.")

    _ensure_icon()
    spec = ROOT / "3dpath.spec"
    distpath = ROOT / "packaging" / "pyi-dist"
    workpath = ROOT / "packaging" / "pyi-build"
    cmd = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--distpath",
        str(distpath),
        "--workpath",
        str(workpath),
        str(spec),
    ]
    print(" ".join(cmd))
    subprocess.check_call(cmd, cwd=ROOT)
    exe = distpath / "3dPath.exe"
    if not exe.is_file():
        raise SystemExit("Build finished, but packaging\\pyi-dist\\3dPath.exe was not found.")
    release_dir = ROOT / "release"
    release_dir.mkdir(parents=True, exist_ok=True)
    shipped = release_dir / "3dPath.exe"
    shutil.copy2(exe, shipped)
    print(f"Built {exe}")
    print(f"Copied {shipped}")
    print("That is the finished app. They double-click 3dPath.exe.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
