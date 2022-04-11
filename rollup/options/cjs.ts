import typescript from "../plugins/typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import type { RollupOptions } from "rollup";
import type { BuildOption } from "./option-type";

export function createOptionCjs(option: BuildOption): RollupOptions {
    const { fileName, minify = false, external = [], globals } = option;
    return {
        input: "./dist/ts/index.ts",
        plugins: [typescript, nodeResolve(), commonjs()],
        external,
        output: {
            file: `dist/cjs/${fileName}${minify ? ".min" : ""}.cjs`,
            format: "cjs",
            sourcemap: minify,
            sourcemapFile: `dist/cjs/${fileName}${minify ? ".min" : ""}.map`,
            globals,
            plugins: [minify ? terser() : undefined],
        },
    };
}
