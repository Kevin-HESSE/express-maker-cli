const displayHelper = require("../helpers/displayHelper");
const fileHelper = require("../helpers/fileHelper");
const connectGenerate = require("../modules/connectGenerate");

/**
 * Function called by the command `express-maker sequelize-connect`
 * 
 * It create a file which allow sequelize to connect to the db based on the env variable.
 */
async function connectCommand(){
  const { db } = await connectGenerate();
  let npm = `npm i sequelize`;

  switch (db) {
    case 'mysql':
      npm += ' mysql2'
      break;
    case 'sqlite':
      npm += ' sqlite3'
      break;
    default:
      npm += ` ${db}`;
      break;
  }

  fileHelper.createConnect(db);

  displayHelper.advice(`Don't forget to run this command`, npm);
};

module.exports = connectCommand;
