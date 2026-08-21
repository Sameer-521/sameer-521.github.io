#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import pathlib

PORT = 8000
DIR = pathlib.Path(__file__).parent


socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(
    ("127.0.0.1", PORT),
    lambda *a, **k: http.server.SimpleHTTPRequestHandler(*a, directory=str(DIR), **k),
) as s:
    print(f"serving {DIR} at http://127.0.0.1:{PORT}  (ctrl-c to stop)")
    try:
        webbrowser.open(f"http://127.0.0.1:{PORT}")
        s.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
