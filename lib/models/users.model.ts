import { Schema } from 'mongoose';
import { Types } from 'mongoose';
import { MongooseService } from '../common/services/mongoose.service';

/**Class which specifies the schema for a user in the DB */
export class UsersModel {
  /**
   * MongooseService instance
   */
  mongooseService: MongooseService = MongooseService.getInstance();
  /**
   * UsersModel instance
   */
  private static instance: UsersModel;

  /**
   * DatabaseSchema
   */
  dbSchema = this.mongooseService.getMongoose().Schema;

  /**
   * User resource schema
   */
  userSchema: Schema = new this.dbSchema({
    username: {
      //type: String,
      type: Number,
      required: true
    }
   });

  /**
   * User model
   */
  usersCollection = this.mongooseService.getMongoose().model('users', this.userSchema);

  constructor(){}

  /**
   * Function which returns the instance of UsersModel class
   */
  public static getInstance(): UsersModel{
    if (!this.instance) {
      this.instance = new UsersModel();
    }
    return this.instance;
  }
}