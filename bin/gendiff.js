#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/differ.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = gendiff(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .parse();
