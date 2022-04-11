import typescript from "../plugins/typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import type { RollupOptions } from "rollup";
import type { BuildOption } from "./option-type";

export function createOptionEsm(option: BuildOption): RollupOptions {
    const { fileName, minify = false, external = [], globals } = option;
    return {
        input: "./dist/ts/index.ts",
        plugins: [typescript, nodeResolve(), commonjs()],
        external,
        output: {
            // dir: "../dist",
            file: `dist/esm/${fileName}${minify ? ".min" : ""}.js`,
            format: "esm",
            sourcemap: minify,
            sourcemapFile: `dist/esm/${fileName}${minify ? ".min" : ""}.map`,
            globals,
            plugins: [minify ? terser() : undefined],
        },
    };
}
