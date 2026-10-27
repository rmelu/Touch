#!/bin/bash
source ~/aider-venv/bin/activate
export OLLAMA_API_BASE=http://localhost:11435
cd ~/dito

while IFS='|' read -r file task; do
  [ -z "$task" ] && continue
  echo ">>> $file: $task"
  for i in 1 2; do
    timeout 900 aider --model ollama_chat/qwen2.5-coder:7b --edit-format whole \
      --yes-always --no-auto-commits --map-tokens 0 --message "$task" "$file"
    out=$(cd app && npx expo export --platform android 2>&1)
    if [ $? -eq 0 ]; then
      git add -A && git commit -qm "ok: $task"
      echo "   OK"
      continue 2
    fi
    task="La build fallisce, correggi $file. Errore: $(echo "$out" | tail -20)"
  done
  git checkout -- . && git clean -fdq app/*.js
  echo "   FALLITO, annullato"
done < tasks.txt