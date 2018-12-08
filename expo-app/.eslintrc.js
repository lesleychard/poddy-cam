module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'es6': true,
    },
    'parser': 'babel-eslint',
    'extends': [
        'airbnb',
        require.resolve('./config/eslint/style.js'),
        require.resolve('./config/eslint/react.js'),
    ],
};