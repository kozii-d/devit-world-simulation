const randomInteger = require('./helpers');

class Human {
    sex = null;
    name = null;
    age = 0;
    eyeColor = null;
    ageOfDeath = null;
    isDead = false;
    sins = 0;

    constructor() {
        this.ageOfDeath = randomInteger(50, 100)
        this.birth();
    }

    birth() {
        const ageIncrease = setInterval(() => {
            this.age++
            if (randomInteger(1, 20) === 20) {
                this.sins++;
            }
            if (this.age >= this.ageOfDeath) {
                this.isDead = true;
                clearInterval(ageIncrease);
            }
        }, 1000);
    }
}

module.exports = Human;
