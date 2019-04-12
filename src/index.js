const path = require('path');

const isIndexFile = (state) => {
    const cwd = state.cwd;
    const filename = state.file.opts.filename;
    const entry = path.normalize(state.opts.entry || 'src/index.js');

    return path.normalize(entry) === path.relative(cwd, filename);
};

const processName = (name) => name
    .replace(/-/g, '.')
    .split('.');

const getPrefixParts = (state) => {
    let prefixParts = [];

    if (Array.isArray(state.opts.prefix)) {
        prefixParts = state.opts.prefix;
    } else if (typeof state.opts.prefix === 'string') {
        prefixParts = processName(state.opts.prefix);
    }

    return prefixParts;
};

const getNameParts = (state) => {
    const prefixParts = getPrefixParts(state);
    let nameParts = [];

    if (Array.isArray(state.opts.libName)) {
        nameParts = state.opts.libName;
    } else if (typeof state.opts.libName === 'string') {
        nameParts = processName(state.opts.libName);
    } else {
        nameParts = processName(require(path.resolve(state.cwd, 'package.json')).name);
    }

    return prefixParts.concat(nameParts);
};

const getConditionalNode = (node, fallback) => `typeof ${node} !== 'undefined' ? ${node} : ${fallback}`;

const getNameSpace = (nameParts) => nameParts
    .map((part, index, array) => array.slice(0, index + 1))
    .map((part) => `root["${part.join('"]["')}"]`)
    .map((part, index, array) => `${part} = ${index === array.length - 1 ? getConditionalNode('exports', '{}') : `${part} || {}`}`)
    .concat('')
    .join(';\n');

const wrapInIife = (code) => `(function(root) {
    ${code}
})(${getConditionalNode('global', getConditionalNode('window', 'this'))})`;

module.exports = function (babel) {
    return {
        visitor: {
            Program(prog, state) {
                if (isIndexFile(state) && !state.opts.done) {
                    const nameParts = getNameParts(state);
                    const nameSpace = getNameSpace(nameParts);
                    const library = wrapInIife(nameSpace);
                    const libraryNode = babel.parse(library).program.body;

                    prog.node.body.push(...libraryNode);

                    state.opts.done = true;
                }
            }
        }
    };
};
