#!/bin/bash
cd /home/kavia/workspace/code-generation/nutritrack-14832-587f56b7/nutritrack
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

