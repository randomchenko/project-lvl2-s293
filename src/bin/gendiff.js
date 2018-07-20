#!/usr/bin/env node
import program from 'commander';
import { description, version } from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .arguments('gendiff <firstConfig> <secondConfig>')
  .description(description)
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
