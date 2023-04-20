import _ from 'lodash';
import { extname } from 'path';
import getFileParserByExtension from './parser_factory.js';

const sortKeys = (obj) => _(obj).keys().sort().reduce((acc, key) => {
  acc[key] = obj[key];
  return acc;
}, {});

export default (firstFilePath, secondFilePath) => {
  const extencion = extname(firstFilePath);
  const parse = getFileParserByExtension(extencion);

  return {
    firstFile: sortKeys(parse(firstFilePath)),
    secondFile: sortKeys(parse(secondFilePath)),
  };
};
