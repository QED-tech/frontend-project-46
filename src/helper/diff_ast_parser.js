import lodash from 'lodash';

function getKeysFromTrees(firstTree, secondTree) {
  const merged = lodash.concat(Object.keys(firstTree), Object.keys(secondTree));

  return lodash.union(merged);
}

function parseAST(firstTree, secondTree) {
  const keys = getKeysFromTrees(firstTree, secondTree);

  return keys.reduce((acc, key) => {
    if (lodash.has(firstTree, key) && firstTree[key] === secondTree[key]) {
      acc[key] = {
        value: firstTree[key],
        state: 'equals',
      };
    }

    return acc;
  }, {});
}

export default parseAST;
