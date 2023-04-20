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
    switch (node.state) {
      case 'parent': {
        return `${spaces(deep, 0)}${node.key}: {\n${stylish(node.children, deep + 1)}${spaces(deep, 0)}}\n`;
      }
      case 'equals': {
        return `${spaces(deep, 2)}  ${node.key}: ${stringifyNodeValue(node.value, deep)}\n`;
      }
      case 'deleted': {
        return `${spaces(deep, 2)}- ${node.key}: ${stringifyNodeValue(node.value, deep)}\n`;
      }
      case 'added': {
        return `${spaces(deep, 2)}+ ${node.key}: ${stringifyNodeValue(node.value, deep)}\n`;
      }
      case 'changed': {
        const rowWithOldValue = `${spaces(deep, 2)}- ${node.key}: ${stringifyNodeValue(node.old_value, deep)}\n`;
        const rowWithNewValue = `${spaces(deep, 2)}+ ${node.key}: ${stringifyNodeValue(node.new_value, deep)}\n`;

        return [rowWithOldValue, rowWithNewValue].join('');
      }

      default: {
        throw new Error(`undefined state: ${node.state}`);
      }
    }
  });

  return build.join('');
};

export default (ast) => `{\n${stylish(ast)}}`;
