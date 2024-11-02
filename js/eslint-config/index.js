// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

import eslint from '@eslint/js';

import errors from './src/errors.js';
import style from './src/style.js';
import typescript from './src/typescript.js';

const baseEslintConfig = tseslint.config(...errors, ...style, eslintConfigPrettier);

const tsEslintConfig = tseslint.config(
    eslint.configs.recommended,
    ...typescript,
    ...baseEslintConfig,
    {
        plugins: {
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks
        },
        rules: {
            ...eslintPluginReactHooks.configs.recommended.rules
        }
    }
);

export { tsEslintConfig };
