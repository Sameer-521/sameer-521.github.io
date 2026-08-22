#!/usr/bin/env python3

"""serve.py — serve the portfolio locally with Python's built-in http.server.

Usage:
    python3 serve.py [port]        (default port: 8000)
Stop with Ctrl+C.
"""

import http.server
import socketserver
import sys

try:
    PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
except ValueError:
    print("Error: [port] must be a number.")
    sys.exit(1)

Handler = http.server.SimpleHTTPRequestHandler


def main():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving at http://localhost:{PORT} (Ctrl+C to stop)")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as exc:
        print(f"Could not bind port {PORT}: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
