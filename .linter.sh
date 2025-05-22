#!/bin/bash
cd /home/kavia/workspace/code-generation/secureverify-pro-95436-95443/secureverify_pro
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

