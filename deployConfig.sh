#!/bin/sh
FILE=./src/config.ts
if [ -f "$FILE" ]; then
    echo "$FILE exist"
else 
    cp ./src/config-template.ts ./src/config.ts
fi