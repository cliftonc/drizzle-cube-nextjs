import { fixupConfigRules } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const nextConfig = nextVitals.map((config) => {
    if (config.name !== "next") {
        return config;
    }

    const { parser, parserOptions, ...languageOptions } = config.languageOptions;

    return {
        ...config,
        languageOptions: {
            ...languageOptions,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                sourceType: "module",
            },
        },
    };
});

export default defineConfig([
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "dist/**",
            "build/**",
        ],
    },
    ...fixupConfigRules(nextConfig),
    {
        rules: {
            "react-hooks/set-state-in-effect": "off",
        },
    },
]);
