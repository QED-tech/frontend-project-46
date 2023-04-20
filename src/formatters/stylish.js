import _ from 'lodash';

const levelSpaces = ' ';

const spaces = (deep, leftShift) => levelSpaces.repeat(deep * 4 - leftShift);

const reduceObject = (tree, deep) => {
  if (!_.isObject(tree)) {
    return tree;
  }

  return _.reduce(tree, (acc, val, key) => {
    if (_.isObject(val)) {
      const currentRow = `\n${spaces(deep, 0)}${key}: {${reduceObject(val, deep + 1)}\n${spaces(deep, 0)}}`;
      return acc + currentRow;
    }

    const currentRow = `\n${spaces(deep, 0)}${key}: ${val}`;
    return acc + currentRow;
  }, '');
};

const stringifyNodeValue = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }

  return `{${reduceObject(value, deep + 1)}\n${spaces(deep, 0)}}`;
};

const stylish = (ast, deep = 1) => {
  const build = ast.map((node) => {
    const {
      key, value, oldVal, newVal, state, children,
    } = node;

    switch (state) {
      case 'parent': {
        return `${spaces(deep, 0)}${key}: {\n${stylish(children, deep + 1)}${spaces(deep, 0)}}\n`;
      }
      case 'equals': {
        const nodeValue = stringifyNodeValue(value, deep);
        return `${spaces(deep, 2)}  ${key}: ${nodeValue}\n`;
      }
      case 'deleted': {
        const nodeValue = stringifyNodeValue(value, deep);
        return `${spaces(deep, 2)}- ${key}: ${nodeValue}\n`;
      }
      case 'added': {
        const nodeValue = stringifyNodeValue(value, deep);
        return `${spaces(deep, 2)}+ ${key}: ${nodeValue}\n`;
      }
      case 'changed': {
        const oldValue = stringifyNodeValue(oldVal, deep);
        const newValue = stringifyNodeValue(newVal, deep);
        return `${spaces(deep, 2)}- ${key}: ${oldValue}\n${spaces(deep, 2)}+ ${key}: ${newValue}\n`;
      }

      default: {
        throw new Error(`undefined state: ${node.state}`);
      }
    }
  });

  return build.join('');
};

export default (ast) => `{\n${stylish(ast)}}`;
