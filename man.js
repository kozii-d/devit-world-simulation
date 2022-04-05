const {randomName, maleNames} = require('./nameGenerator');
const Human = require('./human');

class Man extends Human {
    sex = 'male';

    constructor(eyeColor, name = randomName(maleNames)) {
        super();
        this.eyeColor = eyeColor;
        this.name = name;
    }
}

module.exports = Man;
