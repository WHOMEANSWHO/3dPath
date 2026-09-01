# 3dPath local launcher. Serves the single HTML file on 127.0.0.1 only.
# YouTube embeds need an http origin; a double-clicked file:// tab gets Error 153.

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$htmlPath = Join-Path $root "3dPath.html"
if (-not (Test-Path $htmlPath)) {
  $htmlPath = Join-Path $root "dist\index.html"
}
if (-not (Test-Path $htmlPath)) {
  Write-Host "3dPath.html is missing. Run npm run build in this folder first."
  exit 1
}

function Find-Port {
  for ($p = 17324; $p -lt 17380; $p++) {
    $listener = $null
    try {
      $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $p)
      $listener.Start()
      return $p
    } catch {
      continue
    } finally {
      if ($listener) { $listener.Stop() }
    }
  }
  throw "No free local port."
}

$port = Find-Port
$prefix = "http://127.0.0.1:$port/"
$http = New-Object System.Net.HttpListener
$http.Prefixes.Add($prefix)

try {
  $http.Start()
} catch {
  Write-Host "Could not open a local address. YouTube embeds will fail (Error 153)."
  Write-Host $_.Exception.Message
  Start-Process $htmlPath
  exit 1
}

Start-Process $prefix
Write-Host "3dPath is open at $prefix"
Write-Host "This stays on this PC only. Keep this window open while you learn."
Write-Host "Close this window when you are done."

try {
  while ($http.IsListening) {
    $ctx = $http.GetContext()
    $bytes = [System.IO.File]::ReadAllBytes($htmlPath)
    $ctx.Response.StatusCode = 200
    $ctx.Response.ContentType = "text/html; charset=utf-8"
    $ctx.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin")
    $ctx.Response.Headers.Add("Cache-Control", "no-store")
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    $ctx.Response.Close()
  }
} finally {
  if ($http.IsListening) { $http.Stop() }
  $http.Close()
}
