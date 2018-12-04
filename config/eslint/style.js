'use strict';

module.exports = {
    rules: {
        indent: ['error', 4],
        'max-len': ['error', 200, 4, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'object-curly-spacing': 0,
    },
};
