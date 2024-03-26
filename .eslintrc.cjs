module.exports = {
    env: {
        node: true,
        browser: true,
        es2022: true
    },
    overrides: [
        {
            files: ['*.jsx', '*.js', '*.tsx', '*.ts']
        }
    ],
    extends: [
        'eslint:recommended',
        './eslint/typescript.cjs',
        './eslint/react.cjs',
        './eslint/import-sort.cjs',
        'prettier'
    ]
};
