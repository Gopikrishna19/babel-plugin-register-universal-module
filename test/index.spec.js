const {expect} = require('code');
const spawn = require('cross-spawn');
const path = require('path');

describe('babel-plugin-register-universal-module', () => {
    const transpile = (module) =>
        spawn.sync(
            'npx',
            [
                'babel',
                'src',
                '--out-dir',
                'lib'
            ],
            {
                cwd: path.resolve(__dirname, '..', 'examples', module),
                stdio: 'inherit'
            }
        );

    describe('when transpiling a module', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module');
            const expectedValue = 'variable';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.test.module.variable).to.equal(expectedValue);

            delete global.test;
        });
    });

    describe('when transpiling a module with custom entry', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-custom-entry');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-custom-entry');
            const expectedValue = 'variableWithCustomEntry';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.test.module.variable).to.equal(expectedValue);

            delete global.test;
        });
    });

    describe('when transpiling a module with custom library name as an array', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-custom-lib-name-as-array');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-custom-lib-name-as-array');
            const expectedValue = 'variableWithCustomLibNameAsArray';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.test.module.custom.name.as.array.variable).to.equal(expectedValue);

            delete global.test;
        });
    });

    describe('when transpiling a module with custom library name as a string', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-custom-lib-name-as-string');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-custom-lib-name-as-string');
            const expectedValue = 'variableWithCustomLibNameAsString';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.test.module.custom.name.as.string.variable).to.equal(expectedValue);

            delete global.test;
        });
    });

    describe('when transpiling a module with custom prefix as an array', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-custom-prefix-as-array');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-custom-prefix-as-array');
            const expectedValue = 'variableWithCustomPrefixAsArray';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.prefix.as.array.test.module.variable).to.equal(expectedValue);

            delete global.prefix;
        });
    });

    describe('when transpiling a module with custom prefix as a string', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-custom-prefix-as-string');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-custom-prefix-as-string');
            const expectedValue = 'variableWithCustomPrefixAsString';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.prefix.as.string.test.module.variable).to.equal(expectedValue);

            delete global.prefix;
        });
    });
});

