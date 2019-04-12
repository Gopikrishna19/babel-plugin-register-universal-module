module.exports = {
    plugins: [
        [
            '../../src/index.js',
            {
                libName: ['test', 'module', 'custom', 'name', 'as', 'array']
            }
        ]
    ],
    presets: [
        '@babel/env'
    ]
};
