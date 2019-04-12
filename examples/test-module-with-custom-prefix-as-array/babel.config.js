module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                prefix: ['prefix', 'as', 'array']
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
