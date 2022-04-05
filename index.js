const {randomName, femaleNames, maleNames} = require('./nameGenerator');
const randomInteger = require('./helpers');

class World {
    population;
    hell = [];
    paradise = [];
    colors = ['green', 'blue', 'brown', 'gray'];
    year = 1;

    constructor(population = []) {
        this.population = population;
    }

    live() {
        this.#funeral();
        this.#childbirth();
        this.#getStats();
    }

    #funeral() {
        setInterval(() => {
            this.paradise = this.paradise.concat(this.population.filter(human => !human.sins && human.isDead));
            this.hell = this.hell.concat(this.population.filter(human => human.sins && human.isDead));


            this.population = this.population.filter(human => !human.isDead);
            this.year++;
        }, 1000);
    }

    #childbirth() {
        setInterval(() => {

            let allMans = this.population.filter(man => (man.sex === 'male' && man.age > 17));
            let allWoman = this.population.filter(woman => (woman.sex === 'female' && woman.age > 17));
            const smallestSize = allMans.length < allWoman.length ? allMans.length : allWoman.length;

            for (let i = 0; i < smallestSize; i++) {
                const eyeColor = this.#selectEyeColor(allMans[i], allWoman[i]);
                const newChild = randomInteger(0, 1) === 0 ? new Man(eyeColor) : new Woman(eyeColor);
                this.population.push(newChild);
            }
        }, 1000);
    }

    #selectEyeColor(dad, mom) {
        let eyeColor = null;
        const chance = randomInteger(1, 10);

        if (chance < 5) {
            eyeColor = mom.eyeColor;
        }
        if (chance > 4 && chance < 9) {
            eyeColor = dad.eyeColor;
        }
        if (chance > 8) {
            let randomColor = this.colors.filter(color => color !== mom.eyeColor && color !== dad.eyeColor);
            eyeColor = randomColor[randomInteger(0, randomColor.length - 1)];
        }
        return eyeColor;
    }

    #getStats() {
        setInterval(() => {
            console.log('Год сейчас: ', this.year);
            console.log('Колличество людей: ',this.population.length);
            console.log('Колличество мужчин: ',this.population.filter(man => man.sex === 'male').length);
            console.log('Колличество женщин: ',this.population.filter(woman => woman.sex === 'female').length);
            console.log('Колличество людей младше 18: ',this.population.filter(human => human.age < 18).length);
            console.log('Колличество людей старше 70: ',this.population.filter(human => human.age >= 70).length);
            console.log('Людей с зелёными глазами: ', this.population.filter(human => human.eyeColor === 'green').length);
            console.log('Людей с голубыми глазами: ', this.population.filter(human => human.eyeColor === 'blue').length);
            console.log('Людей с карими глазами: ', this.population.filter(human => human.eyeColor === 'brown').length);
            console.log('Людей с серыми глазами: ', this.population.filter(human => human.eyeColor === 'gray').length);
            console.log('Душ в раю: ', this.paradise.length);
            console.log('Душ в аду: ', this.hell.length);
            console.log('Всего умерло:', this.paradise.length + this.hell.length);
            console.log('');
        }, 5000);
    }
}


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

class Man extends Human {
    sex = 'male';
    constructor(eyeColor, name = randomName(maleNames)) {
        super();
        this.eyeColor = eyeColor;
        this.name = name;
    }
}
class Woman extends Human {
    sex = 'female';
    constructor(eyeColor, name = randomName(femaleNames)) {
        super();
        this.eyeColor = eyeColor;
        this.name = name;
    }
}

const world = new World ([new Man('brown', 'Adam'), new Woman('blue', 'Ewe')]);

world.live();