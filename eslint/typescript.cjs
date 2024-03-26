module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-restricted-imports': [
            'error',
            {
                name: 'react-redux',
                importNames: ['useSelector', 'useDispatch', 'createSlice'],
                message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.'
            }
        ]
    }
};
