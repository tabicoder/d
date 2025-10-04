#!/bin/bash
echo "==================================="
echo "Magic Bento UI Portfolio - Verification"
echo "==================================="
echo ""
echo "📁 File Structure:"
ls -lh index.html styles.css script.js README.md 2>/dev/null | awk '{print "  " $9 " - " $5}'
echo ""
echo "📊 Code Statistics:"
echo "  HTML Lines: $(wc -l < index.html)"
echo "  CSS Lines: $(wc -l < styles.css)"
echo "  JavaScript Lines: $(wc -l < script.js)"
echo "  Total: $(cat index.html styles.css script.js | wc -l) lines"
echo ""
echo "🎨 Component Count:"
echo "  Sections: $(grep -c '<section' index.html)"
echo "  Bento Cards: $(grep -c 'bento-card' index.html)"
echo "  Navigation Items: $(grep -c 'nav-item' index.html)"
echo "  Buttons: $(grep -c 'btn' index.html)"
echo ""
echo "✅ Files Required:"
for file in index.html styles.css script.js; do
  if [ -f "$file" ]; then
    echo "  ✓ $file exists"
  else
    echo "  ✗ $file missing"
  fi
done
echo ""
echo "🚀 To view the portfolio:"
echo "  1. Open index.html in a web browser"
echo "  2. Or run: python3 -m http.server 8000"
echo "  3. Then visit: http://localhost:8000"
echo ""
echo "==================================="
