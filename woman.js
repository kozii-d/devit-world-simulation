const {randomName, femaleNames} = require('./nameGenerator');
const Human = require('./human');

class Woman extends Human {
    sex = 'female';

    constructor(eyeColor, name = randomName(femaleNames)) {
        super();
        this.eyeColor = eyeColor;
        this.name = name;
    }
}

module.exports = Woman;
