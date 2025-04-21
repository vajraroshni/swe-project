const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json').development;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Ingredient = require('./Ingredient')(sequelize, DataTypes);
db.Inventory = require('./Inventory')(sequelize, DataTypes);
db.Supplier = require('./Supplier')(sequelize, DataTypes);
db.PurchaseOrder = require('./PurchaseOrder')(sequelize, DataTypes);

Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

module.exports = db;