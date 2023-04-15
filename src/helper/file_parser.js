import lodash from 'lodash';
import fileReader from './file_reader.js';

function sortKeys(obj) {
  return lodash(obj).keys().sort().reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}

export default (firstFilePath, secondFilePath) => {
  const firstFile = fileReader(firstFilePath);
  const secondFile = fileReader(secondFilePath);

  return {
    firstFile: sortKeys(JSON.parse(firstFile)),
    secondFile: sortKeys(JSON.parse(secondFile)),
  };
};
