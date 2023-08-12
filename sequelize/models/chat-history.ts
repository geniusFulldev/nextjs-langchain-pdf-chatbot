'use strict';

import { Sequelize, Model, CreationOptional,  InferAttributes, InferCreationAttributes, DataTypes, ForeignKey, NonAttribute, HasOneGetAssociationMixin } from 'sequelize';
import { User } from './user';

export class ChatHistory extends Model<InferAttributes<ChatHistory>, InferCreationAttributes<ChatHistory>> {
    declare id: CreationOptional<string>;
    declare userId: string;
    declare question: string; // user prompt
    declare result: string;   // the output of LLM

    // Timestamp
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare user?: NonAttribute<User>;
    declare getUser: HasOneGetAssociationMixin<User>;
  
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }

    public static initModel(sequelize: Sequelize) {
      ChatHistory.init({
            id: {
              type: DataTypes.UUID,
              defaultValue: DataTypes.UUIDV4,
              primaryKey: true
            },
            userId: { 
              type:DataTypes.STRING,
              allowNull: false
            },
            question: { 
              type:DataTypes.STRING(512),
              allowNull: false
            },           
            result: { 
              type:DataTypes.STRING(1024),
              allowNull: false
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
      }, {
        sequelize,
        modelName: 'ChatHistory',
        tableName: 'ChatHistory',
      });
    }

    public static async Sync() {
      await ChatHistory.sync();
    }

    public static async addChat(userId: string, question: string, result: string) {
      try {
          const params = {
              userId, question, result
          };

          const history = await ChatHistory.create(params);
          await history.save();
          return history;
      }
      catch(error: any) {
          console.log('ChatHistoryRepository setChat error =>', error);
          throw error;            
      }
  }

  public static async loadChatHistory(userId: string, limit: number) {
      try {
          const historyArr = await ChatHistory.findAll({
              where: { 
                  userId
              },
              order: [['createdAt', 'DESC']],
              limit,
          });

          const arr = historyArr.map((item) => {
              return [
                  item.question,
                  // item.question,
                  item.result
              ];
          }).reverse();

          return arr;
      }
      catch(error: any) {
          console.log('loadChatHistory error', error);
          throw error;            
      }
  }

  public static async deleteChatHistory(userId: string) {
      try {
          await ChatHistory.destroy({
              where: {
                  userId
              }
          });
      }
      catch(error: any) {
          console.log('deleteChatHistory error', error);
          throw error;             
      }
  }

}

