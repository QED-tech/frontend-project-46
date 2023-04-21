import _ from 'lodash';

function getKeysFromTrees(firstTree, secondTree) {
  return _.sortBy(_.union(_.keys(firstTree), _.keys(secondTree)));
}

function parseAST(firstTree, secondTree) {
  const keys = getKeysFromTrees(firstTree, secondTree);
  return keys.reduce((acc, key) => {
    const issetInFirstAndSecondTrees = _.has(firstTree, key) && _.has(secondTree, key);
    switch (true) {
      case _.isObject(firstTree[key]) && _.isObject(secondTree[key]): {
        const node = {
          children: parseAST(firstTree[key], secondTree[key]),
          state: 'parent',
          key,
        };
        return [...acc, node];
      }

      case issetInFirstAndSecondTrees && firstTree[key] === secondTree[key]: {
        const node = {
          value: firstTree[key],
          state: 'equals',
          key,
        };
        return [...acc, node];
      }

      case !_.has(secondTree, key): {
        const node = {
          value: firstTree[key],
          state: 'deleted',
          key,
        };
        return [...acc, node];
      }

      case !_.has(firstTree, key): {
        const node = {
          value: secondTree[key],
          state: 'added',
          key,
        };

        return [...acc, node];
      }

      default: {
        const node = {
          oldVal: firstTree[key],
          newVal: secondTree[key],
          state: 'changed',
          key,
        };

        return [...acc, node];
      }
    }
  }, []);
}

export default parseAST;
