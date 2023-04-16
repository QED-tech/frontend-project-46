import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import genDiff from '../src/differ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gen diff 2 flat files', () => {
  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/flat_expected.txt`, 'utf8');
  const actual = genDiff(`${__dirname}/../__fixtures__/file1.json`, `${__dirname}/../__fixtures__/file2.json`);

  expect(actual).toBe(expected);
});
