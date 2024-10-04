#!/bin/bash

# Procesar cada directorio que contenga un package.json
for dir in */; do
    if [ -f "${dir}package.json" ]; then
        pushd "$dir"
        npm install && pm2 start npm --name "${dir%/}" -- run dev && npm run start
        popd
    fi
done

# Mantener el contenedor ejecut?ndose (revisar si es necesario)
while true; do sleep 10; done
