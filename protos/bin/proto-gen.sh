#!/bin/bash

protoc --plugin=/opt/homebrew/Cellar/node/21.5.0/lib/node_modules/ts-proto/protoc-gen-ts_proto \
 --ts_proto_out=packages \
 --ts_proto_opt=outputServices=grpc-js \
 --ts_proto_opt=esModuleInterop=true \
 -I=./src ./src/*.proto