#!/bin/bash
source ~/aider-venv/bin/activate
export OLLAMA_API_BASE=http://localhost:11435
cd ~/dito

run_aider() {
  aider --model ollama_chat/qwen2.5-coder:7b --edit-format whole \
    --yes-always --no-auto-commits --message "$1" app/App.js
}

# 1. Esegue tutti i compiti
while IFS= read -r task; do
  [ -z "$task" ] && continue
  echo ">>> $task"
  run_aider "$task"
done < tasks.txt

# 2. Verifica e auto-correzione (max 3 tentativi)
for i in 1 2 3; do
  echo ">>> Verifica $i"
  out=$(cd app && npx expo export --platform android 2>&1)
  if [ $? -eq 0 ]; then
    echo "BUILD OK"
    git add -A && git commit -m "build ok" 
    exit 0
  fi
  run_aider "La build fallisce con questo errore, correggi App.js: $(echo "$out" | tail -30)"
done
echo "BUILD FALLITA dopo 3 tentativi"