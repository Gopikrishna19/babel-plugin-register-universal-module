module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                entry: 'src/entry.js'
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
