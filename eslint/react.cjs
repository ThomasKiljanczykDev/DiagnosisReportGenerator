module.exports = {
    settings: {
        react: {
            version: 'detect'
        }
    },
    plugins: ['react'],
    extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
    rules: {
        'react/prop-types': 'off'
    }
};
