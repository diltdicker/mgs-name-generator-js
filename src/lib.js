const fs = require('fs')
const path = require('path')

function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

/**
 * Method to select a random category list based on various weights
 * 
 * @param {list} items. list of form [ { category: [...], weight: 0.4 }, ...]
 * @returns category list (Array)
 */
function weightedRandom(items) {
    let weights = items.map(item => item.weight);
    let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    let randomNum = Math.random() * totalWeight;
    let weightSum = 0;
    // console.log([weights, totalWeight, randomNum, weightSum])
  
    for (let i = 0; i < items.length; i++) {
      weightSum += items[i].weight;
      if (randomNum < weightSum) {
        return items[i].category;
      }
    }
  }

/**
 * Method to read a given text file and return a list containing each line
 * 
 * @param {String} textFilePath file path of text file
 * @returns list containing each line
 */
function readImportText(textFilePath) {
    let list = []
    data = fs.readFileSync(textFilePath, {encoding:'utf8', flag: 'r' })
    list = data.split('\n') // split mega-string
    list = list.filter(Boolean); // remove empty strings
    // console.log(list)
    return list
}

/**
 * Method to get random number for picking name from category
 * 
 * @param {number} length exlusive max of random number: f(N) = [0 to (N-1)] 
 * @returns number of range 0 to N-1
 */
function selectRand(my_list) {
    return my_list[Math.floor(Math.random() * my_list.length)];
}

/**
 * Metal Gear Style name generator
 * 
 * Capable of generating names in the style of:
 * (adjective | color | emotion | metal/mineral | personality | state)-(animal)-[number]
 * 
 * e.g. blue-heron, potassium-wombat-84, harrowing-bull, quantum-fox-98764...
 */
class MGSNameGenerator {

    constructor() {
        this.animal_list = readImportText(path.join(__dirname, '../names/animal_names.txt'))
        this.adjective_list = readImportText(path.join(__dirname, '../names/adjective_names.txt'))
        this.color_list = readImportText(path.join(__dirname, '../names/color_names.txt'))
        this.emotion_list = readImportText(path.join(__dirname, '../names/emotional_names.txt'))
        this.metal_list = readImportText(path.join(__dirname, '../names/metal_mineral_names.txt'))
        this.personality_list = readImportText(path.join(__dirname, '../names/personality_names.txt'))
        this.state_list = readImportText(path.join(__dirname, '../names/state_names.txt'))
        
        // console.log('constructor run');
    }
    
    /**
     * Method to generate name and return string. Override defaulted options to modify category
     *  chances and to pass a suffix number
     * 
     * @param {number} adj_chance adjective category chance
     * @param {number} clr_chance color category chance
     * @param {number} emo_chance emotion category chance
     * @param {number} per_chance personality category chance
     * @param {number} sta_chance material state category chance
     * @param {number} met_chance metal/mineral category chance
     * @param {number} number_suffix 
     * @returns 
     */
    generate(options={}) {
        const defaultOptions = {
            adj_chance:1.0,
            clr_chance:0.5,
            emo_chance:0.5,
            per_chance:1.7,
            sta_chance:0.1,
            met_chance:0.5, 
            number_suffix:null
        };
        // merge options with any user passed values overriding the defaults
        options = {...defaultOptions, ...options}
        // console.log(options)

        const categories = [
            {category: this.adjective_list, weight: options.adj_chance},
            {category: this.color_list, weight: options.clr_chance},
            {category: this.emotion_list, weight: options.emo_chance},
            {category: this.personality_list, weight: options.per_chance},
            {category: this.state_list, weight: options.sta_chance},
            {category: this.metal_list, weight: options.met_chance},
        ]
        const category = weightedRandom(categories)
        // console.log('category', category)
        let generated_name = selectRand(category)
        // console.log(generated_name) // prefix

        generated_name += '-' + selectRand(this.animal_list)
        // console.log(generated_name) // animal

        // add number if given
        // console.log(options.number_suffix)
        if (options.number_suffix != null && isInt(options.number_suffix)) {
            generated_name += "-" + options.number_suffix
            // console.log(generated_name) // number
        }
        return generated_name
    }
};

module.exports = MGSNameGenerator