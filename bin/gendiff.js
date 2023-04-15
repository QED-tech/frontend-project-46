import { Command } from 'commander';
import fileReader from '../src/helper/file_reader.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>');

program.parse();

const firstFile = program.args[0];

const file = fileReader(firstFile);
console.log(file);
