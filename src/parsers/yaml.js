import {load} from 'js-yaml'
import fileReader from '../helper/file_reader.js';

export default (filePath) => {
    const file = fileReader(filePath);

    return load(file);
};
