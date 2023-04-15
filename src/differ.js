import fileParser from './helper/file_parser.js';
import getDiffAst from './helper/diff_ast_parser.js';

export default (firstFilePath, secondFilePath) => {
  const parsedFiles = fileParser(firstFilePath, secondFilePath);
  // diff ast
  const ast = getDiffAst(parsedFiles.firstFile, parsedFiles.secondFile);
  // format
  console.log(ast);
};
