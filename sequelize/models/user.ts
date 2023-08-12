'use strict';

import { Sequelize, Model, CreationOptional, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import crypto from 'crypto';

function sha512(password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return value;
}

function randStr(n: number) {
  return crypto.randomBytes(Math.ceil(8))
    .toString('hex')
    .slice(0, n);
}

export  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare name: string | null;
  declare image: string | null;
  declare password: string;
  declare salt: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }

  public static initModel(sequelize: Sequelize) {
    User.init({
      id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate:{
            isEmail: {msg: "It must be a valid Email address"},
          },
      },
      name: {
          type: DataTypes.STRING,
          allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true        
      }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'Users'
    });

  }

  public static async Sync() {
    await User.sync();
  }

  public static async findByCredentials(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if( !user ) {
      return null;
    }
    const passHash = sha512(password, user.salt);
    if( passHash != user.password ) {
      return null;
    }

    return user;
  }

  public static async setUser({email, password, name=""}:{email: string, password?: string, name?: string}) {
    let user = await User.findOne({
        where: {
            email
        }
    });

    if( user ) {
      if( password ) {
        const hash = sha512(password, user.salt);
        user.password = hash;
      }
      user.email = email;
      user.name = name;
      await user.save();
    }
    else {
      if(!password ) {
        throw new Error("No password");
      }

      user = await User.create({email, password, name, salt: ""});
      const salt = randStr(16);
      const hash = sha512(user.password, salt);
      user.password = hash;
      user.salt = salt;

      await user.save();
    }
  }

}
