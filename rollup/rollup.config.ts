import { defineConfig } from "rollup";
import { createOptionCjs } from "./options/cjs";
import { createOptionEsm } from "./options/esm";
import { createOptionIife } from "./options/iife";
import { createOptionUmd } from "./options/umd";
import type { ExternalOption, GlobalsOption } from "rollup";

const fileName = "moment-ex-tool";
const outName = "MET";
const external: ExternalOption = ["moment"];
const globals: GlobalsOption = { lodash: "moment" };

export default defineConfig([
    // esm
    createOptionEsm({ fileName, external }),
    createOptionEsm({ fileName, external, minify: true }),
    // cjs
    createOptionCjs({ fileName, external }),
    createOptionCjs({ fileName, external, minify: true }),
    // iife
    createOptionIife({ fileName, outName }),
    createOptionIife({ fileName, outName, minify: true }),
    createOptionIife({ fileName, outName, minify: true, external, globals }),
    // umd
    createOptionUmd({ fileName, outName }),
    createOptionUmd({ fileName, outName, minify: true }),
    createOptionUmd({ fileName, outName, minify: true, external, globals }),
]);
