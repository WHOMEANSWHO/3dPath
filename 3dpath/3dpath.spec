# -*- mode: python ; coding: utf-8 -*-
"""Single 3dPath.exe for GitHub Releases. Rebuild with: python build.py"""

from pathlib import Path

spec_dir = Path(SPECPATH)
html = spec_dir / "dist" / "index.html"
icon = spec_dir / "packaging" / "3dpath.ico"

datas = []
if html.is_file():
    datas.append((str(html), "ui"))

a = Analysis(
    [str(spec_dir / "3dpath_app.py")],
    pathex=[str(spec_dir)],
    binaries=[],
    datas=datas,
    hiddenimports=["webview", "webview.platforms.edgechromium"],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name="3dPath",
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=False,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=str(icon) if icon.is_file() else None,
)
