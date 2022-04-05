const World = require('./world');
const Man = require('./man');
const Woman = require('./woman');

const world = new World ([new Man('brown', 'Adam'), new Woman('blue', 'Ewe')]);
world.live();