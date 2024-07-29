import { tsEslintConfig } from 'eslint-config';
import tseslint from 'typescript-eslint';

export default tseslint.config(...tsEslintConfig, {
    ignores: [
        '**/.yarn/',
        '**/dist*/',
        '**/build/',
        '**/.vscode/',
        '**/.cache/',
        '**/src/router.ts',
        '**/prettier.config.js',
        '**/eslint.config.js',
        'api/**'
    ]
});
