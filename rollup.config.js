import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";

const extensions = ["js", "ts", "tsx"];

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
    nodeResolve({
      extensions,
    }),
    typescript(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    babel({
      extensions,
      babelHelpers: "bundled",
    }),
    commonjs(),
    nodeResolve({
      browser: true,
    }),
    alias({
      entries: [{ find: "~", replacement: "./src" }],
    }),
  ],
};
