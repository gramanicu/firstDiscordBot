#!/bin/sh
FILE=./src/config.ts
if [ -f "$FILE" ]; then
    echo "$FILE exist"
else 
    cp ./src/deployConfig.ts ./src/config.ts
fi