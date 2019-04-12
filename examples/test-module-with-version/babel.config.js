module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                version: true
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
