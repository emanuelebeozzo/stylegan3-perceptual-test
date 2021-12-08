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
   * UserModel instance
   */
  private static instance: UsersModel;

  /**
   * DatabaseSchema
   */
  dbSchema = this.mongooseService.getMongoose().Schema;

  /**
   * Image resource schema
   */
  userSchema: Schema = new this.dbSchema({
    username: {
      //type: String,
      type: Number,
      required: true
    }
   });

  /**
   * Image model
   */
  usersCollection = this.mongooseService.getMongoose().model('users', this.userSchema);

  constructor(){}

  /**
   * Function which returns the instance of UserModel class
   */
  public static getInstance(): UsersModel{
    if (!this.instance) {
      this.instance = new UsersModel();
    }
    return this.instance;
  }

  /**
   * Function that validates a mongoose.Types.ObjectId value
   * 
   * @param id 
   * 
   * @returns true if valid
   * @returns false if not valid
   */
  public isValidId(id:string): boolean{
    return Types.ObjectId.isValid(id);
  } 
}