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
    {
        settings: {
            react: {
                version: 'detect'
            }
        }
    },
    eslint.configs.recommended,
    ...typescript,
    ...baseEslintConfig,
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat['jsx-runtime'],
    eslintPluginReactHooks.configs.flat.recommended
);

export { tsEslintConfig };
