import fileParser from './helper/file_parser.js';
import getDiffAst from './helper/diff_ast_parser.js';
import format from './formatters/formatter.js';

export default (firstFilePath, secondFilePath, formatForPresent) => {
  const parsedFiles = fileParser(firstFilePath, secondFilePath);

  const ast = getDiffAst(parsedFiles.firstFile, parsedFiles.secondFile);

  return format(ast, formatForPresent);
};
