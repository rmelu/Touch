#!/bin/bash
source ~/aider-venv/bin/activate
export OLLAMA_API_BASE=http://localhost:11435
cd ~/dito

for i in 1 2 3; do
  echo ">>> Verifica $i"
  out=$(cd app && npx expo export --platform android 2>&1)
  if [ $? -eq 0 ]; then
    echo "BUILD OK"
    git add -A && git commit -m "build ok"
    exit 0
  fi
  err=$(echo "$out" | tail -30)
  aider --model ollama_chat/qwen2.5-coder:7b --edit-format whole \
    --yes-always --no-auto-commits --map-tokens 0 --timeout 1800 \
    --message "La build fallisce. Correggi app/App.js: c'e una parentesi graffa chiusa in piu che fa terminare la funzione App troppo presto, quindi un return risulta fuori dalla funzione. Riscrivi il file completo con la sintassi corretta. Errore: $err" \
    app/App.js
done
echo "BUILD FALLITA dopo 3 tentativi"
exit 1