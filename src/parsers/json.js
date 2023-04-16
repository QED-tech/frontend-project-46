import fileReader from '../helper/file_reader.js';

export default (filePath) => {
  const file = fileReader(filePath);

  return JSON.parse(file);
};
