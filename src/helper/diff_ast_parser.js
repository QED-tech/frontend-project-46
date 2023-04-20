import lodash from 'lodash';

function getKeysFromTrees(firstTree, secondTree) {
  const merged = lodash.concat(Object.keys(firstTree), Object.keys(secondTree));
  return lodash.uniq(merged).sort();
}

function parseAST(firstTree, secondTree) {
  const keys = getKeysFromTrees(firstTree, secondTree);
  return keys.reduce((acc, key) => {
    const issetInFirstAndSecondTrees = lodash.has(firstTree, key) && lodash.has(secondTree, key);
    let node;

    switch (true) {
      case lodash.isObject(firstTree[key]) && lodash.isObject(secondTree[key]): {
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

      case !lodash.has(secondTree, key): {
        node = {
          value: firstTree[key],
          state: 'deleted',
          key,
        };
        break;
      }

      case !lodash.has(firstTree, key): {
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
