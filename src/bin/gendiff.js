#!/usr/bin/env node
import program from 'commander';
import { description, version } from '../../package.json';

program
    .version(version)
    .description(description)
    .arguments('<firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv)