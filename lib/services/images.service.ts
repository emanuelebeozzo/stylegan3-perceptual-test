import { ImagesModel } from '../models/images.model';
import mongoose from 'mongoose';

/**
 * It aims to manage all the operations that involve the _images_ resource
 * by interacting with the database
 */
export class ImagesService {
  /**
   * ImagesService instance
   */
  private static instance: ImagesService;
  /**
   * Images model
   */
  imagesModel: ImagesModel; 

  /**
   * Constructor which initializes the instance of the ImagesModel
   */
  constructor(){ 
    this.imagesModel = ImagesModel.getInstance();
  }

  /**
   * Function which retrieves the ImagesService instance
   * by creating it if not present
   * 
   * @returns UserService instance
   */
  static getInstance(): ImagesService {
    if (!ImagesService.instance) {
      ImagesService.instance = new ImagesService();
    }
    return ImagesService.instance;
  }

  /**
   * Asynchronous function which retrieves a image given its id
   * 
   * @param resourceId 
   * 
   * @returns requested user
   */
  async getById(resourceId: string): Promise<any>{
    //console.log(resourceId)
    const image = await this.imagesModel.imagesCollection.findById(resourceId).select(['-_id','-type', '-evaluations_list']);
    //console.log(image)
    return image;
    
  }

  /**
   * Asynchronous function which retrieves all the images according to the passed parameters
   * which act as a filter
   * 
   * @param parameters 
   * 
   * @returns users that are compliant with the parameter passed
   */
  async filterList(parameters: any): Promise<any>{
    return await this.imagesModel.imagesCollection.find(parameters).select(['_id']).sort('path');
  }

  /**
   * Function which creates the evaluation resource record
   * 
   * @param resource 
   * 
   * @returns id of the created resource
   */
   async createEval(resource: any) : Promise<any>{
    const newDocumentId = new mongoose.Types.ObjectId();
    const user = new this.imagesModel.imagesCollection(resource);
    await this.imagesModel.imagesCollection.updateOne({
      _id: resource._id,
    }, {
      $push: {
        evaluations_list: {
          _id: newDocumentId,
          user_id: resource.user_id,
          evaluation: resource.evaluation,
        }
      }
    });
    return newDocumentId;
  }

  /**
   * Asynchronous function that retrieves all the image evaluations in the database
   * 
   * @returns the list of all the images'evaluations in the database
   */
  async list(): Promise<any>{
    const images = await this.imagesModel.imagesCollection.find().select(['_id', 'type', 'evaluations_list.evaluation']).exec();
    return images;
  }
}