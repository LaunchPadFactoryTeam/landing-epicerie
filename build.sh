#!/usr/bin/env bash
# build.sh — Assemble public/ pour le déploiement Cloudflare (Linux CI)
# Usage : bash build.sh
# Puis  : npx wrangler deploy
set -e

OUT="public"
SRC="landings"

echo "Nettoyage de $OUT/..."
# On vide le contenu de public/ sans supprimer le dossier (wrangler dev le
# verrouille sous Windows ; supprimer le dossier échouerait en session dev).
mkdir -p "$OUT"
rm -rf "$OUT"/* "$OUT"/.[!.]* 2>/dev/null || true

echo "[1/1] Copie des landings ($SRC → $OUT)..."
cp -r "$SRC"/. "$OUT/"
echo "  OK"

# _redirects à la racine (Cloudflare Static Assets)
# Le slash final est géré nativement via assets.html_handling = "drop-trailing-slash".
cat > "$OUT/_redirects" << 'EOF'
# Redirections Cloudflare Static Assets (une par ligne : source destination code)
EOF

echo ""
echo "============================================"
echo "Build terminé → ./$OUT/"
echo "  Fichiers total : $(find $OUT -type f | wc -l)"
echo "============================================"
echo ""
echo "Prêt à déployer :"
echo "  npx wrangler deploy"
