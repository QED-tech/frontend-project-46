import _ from 'lodash';

const levelSpaces = ' ';

const spaces = (deepth, leftShift) => levelSpaces.repeat(deepth * 4 - leftShift);

const reduceObject = (tree, deepth) => {
  if (!_.isObject(tree)) {
    return tree;
  }

  return _.reduce(tree, (acc, val, key) => {
    if (_.isObject(val)) {
      const currentRow = `\n${spaces(deepth, 0)}${key}: {${reduceObject(val, deepth + 1)}\n${spaces(deepth, 0)}}`;
      return acc + currentRow;
    }

    const currentRow = `\n${spaces(deepth, 0)}${key}: ${val}`;
    return acc + currentRow;
  }, '');
};

const stringifyNodeValue = (value, deepth) => {
  if (!_.isObject(value)) {
    return value;
  }

  return `{${reduceObject(value, deepth + 1)}\n${spaces(deepth, 0)}}`;
};

const stylish = (ast, deepth = 1) => {
  const build = ast.map((node) => {
    const {
      key, value, oldVal, newVal, state, children,
    } = node;

    switch (state) {
      case 'parent': {
        return `${spaces(deepth, 0)}${key}: {\n${stylish(children, deepth + 1)}${spaces(deepth, 0)}}\n`;
      }
      case 'equals': {
        const nodeValue = stringifyNodeValue(value, deepth);
        return `${spaces(deepth, 2)}  ${key}: ${nodeValue}\n`;
      }
      case 'deleted': {
        const nodeValue = stringifyNodeValue(value, deepth);
        return `${spaces(deepth, 2)}- ${key}: ${nodeValue}\n`;
      }
      case 'added': {
        const nodeValue = stringifyNodeValue(value, deepth);
        return `${spaces(deepth, 2)}+ ${key}: ${nodeValue}\n`;
      }
      case 'changed': {
        const oldValue = stringifyNodeValue(oldVal, deepth);
        const newValue = stringifyNodeValue(newVal, deepth);
        return `${spaces(deepth, 2)}- ${key}: ${oldValue}\n${spaces(deepth, 2)}+ ${key}: ${newValue}\n`;
      }

      default: {
        throw new Error(`undefined state: ${node.state}`);
      }
    }
  });

  return build.join('');
};

export default (ast) => `{\n${stylish(ast)}}`;
