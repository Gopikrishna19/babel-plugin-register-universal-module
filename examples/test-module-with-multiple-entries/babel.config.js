module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                entry: [
                    'src/entry1.js',
                    'src/entry2.js'
                ]
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
