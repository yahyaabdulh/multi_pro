'use strict';

const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelizeStream = require('node-sequelize-stream');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]
const db = {};
const colors =  require('colors/safe');

const loggingOptions = {
  benchmark: true,
  logging: (logStr, execTime, options) => {
    if (!options) {
      options = execTime;
      execTime = undefined;
    }

    let col = null;
    switch (options.type) {
      case 'SELECT':
        col = colors.blue.bold;
        break;
      case 'BULKUPDATE':
      case 'UPDATE':
        col = colors.yellow.bold;
        break;
      case 'INSERT':
        col = colors.green.bold;
        break;
      case 'BULKDELETE':
      case 'DELETE':
        col = colors.cyan;
        break;
      default:
        col = colors.bgCyan.bold;
        break;
    }
    if (execTime) {
      if (execTime >= 500) {
        col = colors.red.bold;
        console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
      } else {
        console.log(colors.magenta.bold(`[${execTime} ms]`), col(logStr));
      }
    }
  }
}


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    ...loggingOptions
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    ...loggingOptions
  });
}

const files = [];
const sortDir = maniDir => {
  const folders = [];
  const CheckFile = filePath => fs.statSync(filePath).isFile();
  const sortPath = dir => {
    fs
      .readdirSync(dir)
      .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
      .forEach(res => {
        const filePath = path.join(dir, res);
        if (filePath.indexOf("Schema") === -1) {
          if (CheckFile(filePath)) {
            files.push(filePath);
          } else {
            folders.push(filePath);
          }
        }
      });
  };
  folders.push(maniDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};
sortDir(__dirname);

files.forEach(file => {
  const model = require(path.join( file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  } 

});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({
   logging: false,
 });

sequelizeStream(sequelize,100)

module.exports = db;
