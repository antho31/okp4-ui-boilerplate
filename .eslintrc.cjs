module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["@okp4"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: {
        project: "./tsconfig.json"
    },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
};
