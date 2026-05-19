# ============================================================
# build.ps1 — Assemble public/ pour le déploiement Cloudflare
#
# Structure finale :
#   public/           ← landing agence (webflow-export/)
#   public/epiceries/ ← landing épicerie fine (epiceries/)
#
# Usage : .\build.ps1
# Puis  : npx wrangler deploy
# ============================================================

$outDir      = "public"
$webflowSrc  = "webflow-export"
$epiceriesSrc = "epiceries"

# ── Nettoyage ──────────────────────────────────────────────
if (Test-Path $outDir) {
    Write-Host "Nettoyage de $outDir/..." -ForegroundColor Yellow
    Remove-Item $outDir -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# ── 1. Landing agence (webflow-export/ → public/) ──────────
Write-Host "`n[1/2] Copie landing agence ($webflowSrc → $outDir)..." -ForegroundColor Cyan

if (-not (Test-Path $webflowSrc)) {
    Write-Host "  ERREUR : dossier '$webflowSrc' introuvable." -ForegroundColor Red
    Write-Host "  Lancez d'abord : .\extract-webflow.ps1" -ForegroundColor Red
    exit 1
}

Copy-Item -Path "$webflowSrc\*" -Destination $outDir -Recurse -Force
Write-Host "  OK" -ForegroundColor Green

# ── 2. Landing épicerie (epiceries/ → public/epiceries/) ───
Write-Host "`n[2/2] Copie landing épicerie ($epiceriesSrc → $outDir/epiceries)..." -ForegroundColor Cyan

$epicDest = Join-Path $outDir "epiceries"
New-Item -ItemType Directory -Force -Path $epicDest | Out-Null
Copy-Item -Path "$epiceriesSrc\*" -Destination $epicDest -Recurse -Force
Write-Host "  OK" -ForegroundColor Green

# ── _redirects à la racine de public/ ──────────────────────
# Cloudflare Workers Static Assets lit ce fichier pour les redirections.
$redirects = @"
# Trailing slash → sans trailing slash pour les pages webflow
/about-us/    /about-us    301
/services/    /services    301
/pricing/     /pricing     301
/blog/        /blog        301
/faq/         /faq         301
/works/       /works       301
/contact-us/  /contact-us  301
"@

$redirects | Set-Content (Join-Path $outDir "_redirects") -Encoding UTF8
Write-Host "`n  _redirects écrit" -ForegroundColor Green

# ── Résumé ─────────────────────────────────────────────────
$pageCount  = (Get-ChildItem $outDir -Filter "index.html" -Recurse).Count
$assetCount = (Get-ChildItem $outDir -Recurse -File).Count

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "Build terminé → ./$outDir/" -ForegroundColor Yellow
Write-Host "  Pages index.html : $pageCount"
Write-Host "  Fichiers total   : $assetCount"
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prêt à déployer :" -ForegroundColor Green
Write-Host "  npx wrangler deploy" -ForegroundColor White
