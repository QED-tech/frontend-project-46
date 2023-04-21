import _ from 'lodash';

const stringifyNodeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (ast, parentKey = '') => {
  const build = ast.map((node) => {
    const {
      key, value, oldVal, newVal, state, children,
    } = node;

    const pathKey = `${parentKey}${parentKey === '' ? '' : '.'}${key}`;

    switch (state) {
      case 'parent': {
        return plain(children, pathKey);
      }
      case 'equals': {
        return '';
      }
      case 'deleted': {
        return `Property '${pathKey}' was removed\n`;
      }
      case 'added': {
        return `Property '${pathKey}' was added with value: ${stringifyNodeValue(value)}\n`;
      }
      case 'changed': {
        const oldValue = stringifyNodeValue(oldVal);
        const newValue = stringifyNodeValue(newVal);
        return `Property '${pathKey}' was updated. From ${oldValue} to ${newValue}\n`;
      }

      default: {
        throw new Error(`undefined state: ${node.state}`);
      }
    }
  });

  return build.join('');
};

export default (ast) => plain(ast).trimEnd();
