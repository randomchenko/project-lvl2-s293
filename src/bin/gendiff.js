#!/usr/bin/env node
import program from 'commander';
import { description, version } from '../../package.json';
import gendiff from '..';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
