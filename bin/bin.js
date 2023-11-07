#!/usr/bin/env node
const cli = require('commander')
const MGSNameGenerator = require('../src/lib')

let generator = new MGSNameGenerator();
// console.log("cli application")
console.log(generator.generate({number_suffix: 456}))
