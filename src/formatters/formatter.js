import lodash from 'lodash';

const levelSpaces = '  ';

const getDiffRowByNode = (node, nodeKey) => {
  switch (node.state) {
    case 'equals': {
      return `${levelSpaces}  ${nodeKey}: ${node.value}`;
    }
    case 'deleted': {
      return `${levelSpaces}- ${nodeKey}: ${node.value}`;
    }
    case 'added': {
      return `${levelSpaces}+ ${nodeKey}: ${node.value}`;
    }
    case 'changed': {
      const rowWithOldValue = `${levelSpaces}- ${nodeKey}: ${node.old_value}`;
      const rowWithNewValue = `${levelSpaces}- ${nodeKey}: ${node.new_value}`;

      return [rowWithOldValue, rowWithNewValue].join('\n');
    }

    default: {
      return nodeKey;
    }
  }
};

export default (ast) => {
  const build = lodash.reduce(ast, (acc, val, key) => {
    acc.push(getDiffRowByNode(val, key));
    return acc;
  }, []);

  return ['{', build.join('\n'), '}'].join('\n');
};
