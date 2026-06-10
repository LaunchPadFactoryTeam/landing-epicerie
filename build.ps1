# ============================================================
# build.ps1 — Assemble public/ pour le déploiement Cloudflare
#
# Structure finale (miroir de landings/) :
#   public/                    ← landing agence
#   public/articles/           ← articles agence (à venir)
#   public/epiceries/          ← landing épicerie fine
#   public/epiceries/traceo/   ← page produit Traceo
#   public/epiceries/articles/ ← articles épicerie
#
# Usage : .\build.ps1
# Puis  : npx wrangler deploy
# ============================================================

$outDir = "public"
$src    = "landings"

# ── Nettoyage ──────────────────────────────────────────────
# On vide le CONTENU de public/ sans supprimer le dossier lui-même :
# `wrangler dev` garde un verrou sur public/ sous Windows, et supprimer le
# dossier échouerait pendant une session dev.
if (Test-Path $outDir) {
    Write-Host "Nettoyage de $outDir/..." -ForegroundColor Yellow
    Get-ChildItem -Path $outDir -Force | Remove-Item -Recurse -Force
} else {
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

# ── Copie des landings (landings/ → public/) ─────────────
Write-Host "`n[1/1] Copie des landings ($src → $outDir)..." -ForegroundColor Cyan

if (-not (Test-Path $src)) {
    Write-Host "  ERREUR : dossier '$src' introuvable." -ForegroundColor Red
    exit 1
}

Copy-Item -Path "$src\*" -Destination $outDir -Recurse -Force
Write-Host "  OK" -ForegroundColor Green

# ── _redirects à la racine de public/ ──────────────────────
# La gestion du slash final (/epiceries/ → /epiceries) est faite nativement
# par Cloudflare via assets.html_handling = "drop-trailing-slash".
# Ce fichier reste vide (placeholder) pour d'éventuelles redirections futures.
$redirects = @"
# Redirections Cloudflare Static Assets (une par ligne : source destination code)
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
