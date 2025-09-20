#!/bin/bash
cd /home/kavia/workspace/code-generation/devdiary-platform-87346-87355/devdiary_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

