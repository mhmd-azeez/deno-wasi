import Context from "https://deno.land/std@0.200.0/wasi/snapshot_preview1.ts";

const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
});

console.log("begin");

const binary = await Deno.readFile(
  "plugin/dist-newstyle/build/wasm32-wasi/ghc-9.9.20230623/hello-1.0.0.2/build/hello/hello.wasm"
);

const module = await WebAssembly.instantiate(binary, {
  wasi_snapshot_preview1: context.exports,
  // env: {
  //   extism_alloc(n: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_free(n: bigint) {},
  //   extism_load_u8(n: bigint): number {
  //     return 0;
  //   },
  //   extism_load_u64(n: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_store_u8(offset: bigint, n: number) {},
  //   extism_store_u64(offset: bigint, n: bigint) {},
  //   extism_input_length(): bigint {
  //     return BigInt(0);
  //   },
  //   extism_input_load_u8(i: bigint): number {
  //     return 0;
  //   },
  //   extism_input_load_u64(idx: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_output_set(offset: bigint, length: bigint) {},
  //   extism_error_set(i: bigint) {},
  //   extism_config_get(i: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_var_get(i: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_var_set(n: bigint, i: bigint) {},
  //   extism_http_request(requestOffset: bigint, bodyOffset: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_http_status_code(): number {
  //     return 0;
  //   },
  //   extism_length(i: bigint): bigint {
  //     return BigInt(0);
  //   },
  //   extism_log_warn(i: bigint) {
  //     return 0;
  //   },
  //   extism_log_info(i: bigint) {
  //     return 0;
  //   },
  //   extism_log_debug(i: bigint) {
  //     return 0;
  //   },
  //   extism_log_error(i: bigint) {
  //     return 0;
  //   },
  // },
});

try {
  const { _start, hs_init } = module.instance.exports;
  if (typeof _start !== "function") {
    throw new TypeError("_start must be a function");
  } else if (typeof hs_init !== "function") {
    throw new TypeError("_start must be a function");
  }

  // 1. using the built-in start (crashes after the _start function is executed):
  // Mo in D:\dylibso\x\deno-wasi\host λ deno run -A .\index.ts
  // begin
  // Hello, World!
  context.start(module.instance);

  //   // 2. calling _start directly (crashes):
  //   // Mo in D:\dylibso\x\deno-wasi\host λ deno run -A .\index.ts
  //   // begin
  //   hs_init();
  //   console.log("initialized")
  //  _start();
} catch (err) {
  console.error("err: ", err);
}

// doesn't reach here :(
console.log("end");
