module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                libName: 'test-module.custom-name-as-string'
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
