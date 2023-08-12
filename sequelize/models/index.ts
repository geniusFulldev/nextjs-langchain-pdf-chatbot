
import process from 'process';
import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

console.log('db config =>', config);
import { User } from "./user";
import { ChatHistory } from "./chat-history";

const models = {
  User, ChatHistory
};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] || '', config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

for( const model in models) {
  models[model as (keyof typeof models)].initModel(sequelize);
}

for( const model in models) {
    models[model as (keyof typeof models)].associate(models);
}

const initDB = async() => {
  for(const model in models ) {
    console.log(`Model ${model} is in sync`);
    await models[model as keyof typeof models].Sync();
  }

  return {
    sequelize,
    models
  }
}

export const db = await initDB();