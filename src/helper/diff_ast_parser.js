import lodash from 'lodash';

function getKeysFromTrees(firstTree, secondTree) {
  const merged = lodash.concat(Object.keys(firstTree), Object.keys(secondTree));

  return lodash.union(merged);
}

function parseAST(firstTree, secondTree) {
  const keys = getKeysFromTrees(firstTree, secondTree);

  return keys.reduce((acc, key) => {
    const issetInFirstAndSecondTrees = lodash.has(firstTree, key) && lodash.has(secondTree, key);

    if (issetInFirstAndSecondTrees && firstTree[key] === secondTree[key]) {
      acc[key] = {
        value: firstTree[key],
        state: 'equals',
      };
    }

    if (!lodash.has(secondTree, key)) {
      acc[key] = {
        value: firstTree[key],
        state: 'deleted',
      };
    }

    if (!lodash.has(firstTree, key)) {
      acc[key] = {
        value: secondTree[key],
        state: 'added',
      };
    }

    if (issetInFirstAndSecondTrees && firstTree[key] !== secondTree[key]) {
      acc[key] = {
        old_value: firstTree[key],
        new_value: secondTree[key],
        state: 'changed',
      };
    }

    return acc;
  }, {});
}

export default parseAST;
