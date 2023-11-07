#!/usr/bin/env node
const {program} = require('commander')
const MGSNameGenerator = require('../src/lib')

program.name('mgs-name-generator')
.description('CLI to gerenerate random name in the style of MGS: e.g. blue-canary')
.version('1.0.0')
.option('-n, --number <number>', "optional number id to append to the end of name. e.g. harrowing-toucan-1234", null)
.option('-a, --adjective <number>', "randomization weight for name category", 1.0)
.option('-c, --color <number>', "randomization weight for name category", 0.5)
.option('-e, --emotion <number>', "randomization weight for name category", 0.5)
.option('-m, --metal <number>', "randomization weight for name category", 0.5)
.option('-p, --personality <number>', "randomization weight for name category", 1.7)
.option('-s, --state <number>', "randomization weight for name category", 0.1)
.option('-s, --state <number>', "randomization weight for name category", 0.1)
.option('-d, --debug', 'output extra debugging')

program.parse();

const options = program.opts();
try {
    const gen_options = {
        number_suffix: parseInt(options.number),
        adj_chance: parseFloat(options.adjective),
        clr_chance: parseFloat(options.color),
        emo_chance: parseFloat(options.emotion),
        per_chance: parseFloat(options.personality),
        sta_chance: parseFloat(options.state),
        met_chance: parseFloat(options.metal)
    }  
    const generator = new MGSNameGenerator();
    console.log(generator.generate(gen_options))
} catch (error) {
    
    if (options.debug) {
        console.error(error)
    } else {
        console.error('ERROR something went wrong, please check your input options')
    }
}
