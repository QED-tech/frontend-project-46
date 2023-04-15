import fs from 'fs';

export default (filePath) => fs.readFileSync(filePath, 'utf8');
