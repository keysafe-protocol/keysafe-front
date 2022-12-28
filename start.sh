#!/usr/bin/env sh

docker build -t keysafe-frontend .
docker run --rm -p 3000:3000 -e REACT_APP_BASE_URL='https://demo.keysafe.network/ks' keysafe-frontend