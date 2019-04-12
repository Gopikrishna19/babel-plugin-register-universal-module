module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                prefix: 'prefix.as.string'
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
