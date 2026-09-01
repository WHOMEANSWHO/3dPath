# 3dPath local launcher. Always http://127.0.0.1:17324/ — same address as the exe.
# A different port would look like a different website, so ticks and notes vanish.
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

$port = 17324
$prefix = "http://127.0.0.1:$port/"

function Test-LoopbackOpen([int]$p) {
  $client = $null
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $iar = $client.BeginConnect("127.0.0.1", $p, $null, $null)
    $ok = $iar.AsyncWaitHandle.WaitOne(400, $false)
    if (-not $ok) { return $false }
    $client.EndConnect($iar)
    return $true
  } catch {
    return $false
  } finally {
    if ($client) { $client.Close() }
  }
}

if (Test-LoopbackOpen $port) {
  Start-Process $prefix
  Write-Host "3dPath is already open at $prefix"
  Write-Host "Using that address so your ticks and notes stay put."
  Write-Host "Close the other 3dPath window if you meant to restart."
  exit 0
}

$http = New-Object System.Net.HttpListener
$http.Prefixes.Add($prefix)

try {
  $http.Start()
} catch {
  Write-Host "Could not open $prefix"
  Write-Host "3dPath always uses port 17324 so progress does not vanish."
  Write-Host $_.Exception.Message
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
