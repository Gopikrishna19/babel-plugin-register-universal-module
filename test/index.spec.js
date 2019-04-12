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

    describe('when transpiling a module with multiple entries', () => {
        it('should merge and register the modules on global namespace', () => {
            const result = transpile('test-module-with-multiple-entries');

            expect(result.error).to.not.exist();

            const lib1 = require('../examples/test-module-with-multiple-entries/lib/entry1');
            const lib2 = require('../examples/test-module-with-multiple-entries/lib/entry2');
            const expectedValue1 = 'variableAtEntry1';
            const expectedValue2 = 'variableAtEntry2';

            expect(lib1.entry1Variable).to.equal(expectedValue1);
            expect(lib2.entry2Variable).to.equal(expectedValue2);
            expect(global.test.module.entry1Variable).to.equal('variableAtEntry1');
            expect(global.test.module.entry2Variable).to.equal('variableAtEntry2');

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

    describe('when transpiling a module with version', () => {
        it('should register the module on global namespace', () => {
            const result = transpile('test-module-with-version');

            expect(result.error).to.not.exist();

            const lib = require('../examples/test-module-with-version');
            const expectedValue = 'variableWithVersion';

            expect(lib.variable).to.equal(expectedValue);
            expect(global.test.module['0.1.0'].variable).to.equal(expectedValue);

            delete global.test;
        });
    });
});

