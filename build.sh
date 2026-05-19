#!/usr/bin/env bash
# build.sh — Assemble public/ pour le déploiement Cloudflare (Linux CI)
# Usage : bash build.sh
# Puis  : npx wrangler deploy
set -e

OUT="public"
WEBFLOW="webflow-export"
EPICERIES="epiceries"

echo "Nettoyage de $OUT/..."
rm -rf "$OUT"
mkdir -p "$OUT"

echo "[1/2] Copie landing agence ($WEBFLOW → $OUT)..."
cp -r "$WEBFLOW"/. "$OUT/"
echo "  OK"

echo "[2/2] Copie landing épicerie ($EPICERIES → $OUT/epiceries)..."
mkdir -p "$OUT/epiceries"
cp -r "$EPICERIES"/. "$OUT/epiceries/"
echo "  OK"

# _redirects à la racine (Cloudflare Static Assets)
cat > "$OUT/_redirects" << 'EOF'
/about-us/    /about-us    301
/services/    /services    301
/pricing/     /pricing     301
/blog/        /blog        301
EOF

echo ""
echo "============================================"
echo "Build terminé → ./$OUT/"
echo "  Fichiers total : $(find $OUT -type f | wc -l)"
echo "============================================"
echo ""
echo "Prêt à déployer :"
echo "  npx wrangler deploy"
