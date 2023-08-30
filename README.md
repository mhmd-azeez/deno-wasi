```
source ~/.ghc-wasm/env

cd plugin
wasm32-wasi-cabal build
cd ..

wasm-objdump --section=export --details plugin/dist-newstyle/build/wasm32-wasi/ghc-9.9.20230623/hello-1.0.0.2/build/hello/hello.wasm

deno run -A ./host/index.ts   
```