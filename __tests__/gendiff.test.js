import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import genDiff from '../src/differ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gen diff 2 flat json files', () => {
  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/flat_json/expected.txt`, 'utf8');
  const actual = genDiff(`${__dirname}/../__fixtures__/flat_json/file1.json`, `${__dirname}/../__fixtures__/flat_json/file2.json`);

  expect(actual).toBe(expected);
});

test('gen diff 2 flat yaml files', () => {
  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/flat_yaml/expected.txt`, 'utf8');
  const actual = genDiff(`${__dirname}/../__fixtures__/flat_yaml/file1.yaml`, `${__dirname}/../__fixtures__/flat_yaml/file2.yaml`);

  expect(actual).toBe(expected);
});

test('gen diff 2 nested json files', () => {
  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/nested_json/expected.txt`, 'utf8');
  const actual = genDiff(`${__dirname}/../__fixtures__/nested_json/file1.json`, `${__dirname}/../__fixtures__/nested_json/file2.json`);

  expect(actual).toBe(expected);
});

test('gen diff 2 nested json files with plain format', () => {
  const expected = fs.readFileSync(`${__dirname}/../__fixtures__/plain_nested_json/expected.txt`, 'utf8');
  const actual = genDiff(
    `${__dirname}/../__fixtures__/plain_nested_json/file1.json`,
    `${__dirname}/../__fixtures__/plain_nested_json/file2.json`,
    'plain',
  );

  expect(actual).toBe(expected);
});
