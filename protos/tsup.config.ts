import { defineConfig} from "tsup";

export default defineConfig({
    format: ["cjs", "esm"],
    entry: ["./packages/index.ts"],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true
})