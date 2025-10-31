import typescript from "rollup-plugin-typescript2"; // 处理typescript
import babel from "@rollup/plugin-babel";

export default [
    {
        input: "src/koi.ts",
        plugins: [
            typescript(), // typescript 转义
            babel({
                babelrc: false,
                presets: [["@babel/preset-env", { modules: false, loose: true }]],
                plugins: [["@babel/plugin-transform-class-properties", { loose: true }]],
                exclude: "node_modules/**",
            }),
        ],
        output: [
            { file: "dist/koi-core.js", format: "cjs" },
            { file: "dist/koi-core.esm.js", format: "es" },
        ],
    },
];
