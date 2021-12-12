import { Schema } from 'mongoose';
import { Types } from 'mongoose';
import { MongooseService } from '../common/services/mongoose.service';

/**Class which specifies the schema for a image in the DB */
export class ImagesModel {
  /**
   * MongooseService instance
   */
  mongooseService: MongooseService = MongooseService.getInstance();
  /**
   * ImageModel instance
   */
  private static instance: ImagesModel;

  /**
   * DatabaseSchema
   */
  dbSchema = this.mongooseService.getMongoose().Schema;

  /**
   * Image resource schema
   */
  imageSchema: Schema = new this.dbSchema({
    path: { 
      type: String,
      required: true
    },
    // 0: real
    // 1: synthethic
    type: { 
      type: Number, 
      required: true
    }, 
    evaluations_list: [{
      evaluation: {
        type: Number,
        required: true
      }, 
      user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        required: true
      }
    }]
   });

  /**
   * Image model
   */
  imagesCollection = this.mongooseService.getMongoose().model('images', this.imageSchema);

  constructor(){}

  /**
   * Function which returns the instance of ImageModel class
   */
  public static getInstance(): ImagesModel{
    if (!this.instance) {
      this.instance = new ImagesModel();
    }
    return this.instance;
  }
}