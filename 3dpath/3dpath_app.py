"""3dPath desktop window. Learners double-click 3dPath.exe — no Node, no Python."""

from __future__ import annotations

import ctypes
import http.server
import socket
import socketserver
import sys
import threading
from pathlib import Path

HOST = "127.0.0.1"
PORT = 17324


def _bundle_html() -> Path:
    if getattr(sys, "frozen", False):
        return Path(sys._MEIPASS) / "ui" / "index.html"
    return Path(__file__).resolve().parent / "dist" / "index.html"


def _alert(message: str) -> None:
    ctypes.windll.user32.MessageBoxW(0, message, "3dPath", 0x10)


def _port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.25)
        return sock.connect_ex((HOST, port)) == 0


class _Handler(http.server.BaseHTTPRequestHandler):
    html_bytes = b""

    def do_GET(self) -> None:  # noqa: N802
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("Content-Length", str(len(self.html_bytes)))
        self.end_headers()
        self.wfile.write(self.html_bytes)

    def log_message(self, format: str, *args: object) -> None:  # noqa: A003
        return


class _Server(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def _serve(html: bytes) -> _Server:
    _Handler.html_bytes = html
    server = _Server((HOST, PORT), _Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server


def main() -> int:
    html_path = _bundle_html()
    if not html_path.is_file():
        _alert("3dPath.html is missing. Run npm run build, then python build.py.")
        return 1

    html = html_path.read_bytes()
    server: _Server | None = None
    if not _port_in_use(PORT):
        try:
            server = _serve(html)
        except OSError as exc:
            _alert(f"Could not open http://{HOST}:{PORT}/\n{exc}")
            return 1

    import webview

    webview.settings["OPEN_EXTERNAL_LINKS_IN_BROWSER"] = True
    webview.create_window(
        "3dPath",
        f"http://{HOST}:{PORT}/",
        width=1600,
        height=900,
        min_size=(1080, 720),
        background_color="#0c0e12",
        text_select=True,
    )
    webview.start()
    if server is not None:
        server.shutdown()
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
