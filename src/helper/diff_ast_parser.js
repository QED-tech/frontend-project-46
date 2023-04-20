import _ from 'lodash';

function getKeysFromTrees(firstTree, secondTree) {
  const merged = _.concat(_.keys(firstTree), _.keys(secondTree));
  return _.uniq(merged).sort();
}

function parseAST(firstTree, secondTree) {
  const keys = getKeysFromTrees(firstTree, secondTree);
  return keys.reduce((acc, key) => {
    const issetInFirstAndSecondTrees = _.has(firstTree, key) && _.has(secondTree, key);
    let node;

    switch (true) {
      case _.isObject(firstTree[key]) && _.isObject(secondTree[key]): {
        node = {
          children: parseAST(firstTree[key], secondTree[key]),
          state: 'parent',
          key,
        };
        break;
      }

      case issetInFirstAndSecondTrees && firstTree[key] === secondTree[key]: {
        node = {
          value: firstTree[key],
          state: 'equals',
          key,
        };
        break;
      }

      case !_.has(secondTree, key): {
        node = {
          value: firstTree[key],
          state: 'deleted',
          key,
        };
        break;
      }

      case !_.has(firstTree, key): {
        node = {
          value: secondTree[key],
          state: 'added',
          key,
        };
        break;
      }

      default: {
        node = {
          old_value: firstTree[key],
          new_value: secondTree[key],
          state: 'changed',
          key,
        };
      }
    }

    acc.push(node);
    return acc;
  }, []);
}

export default parseAST;
