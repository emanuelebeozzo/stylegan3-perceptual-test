import { ImagesModel } from '../models/images.model';

/**
 * It aims to manage all the operations that involve the _user_ resource
 * by interacting with the database
 */
export class ImagesService {
  /**
   * UserService instance
   */
  private static instance: ImagesService;
  /**
   * Images model
   */
  imagesModel: ImagesModel; 

  /**
   * Constructor which initializes the instance of the UserModel
   */
  constructor(){ 
    this.imagesModel = ImagesModel.getInstance();
  }

  /**
   * Function which retrieves the UserService instance
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
   * Asynchronous function that retrieves the id of 30 image in the database
   * 
   * @returns the list of all the users in the database
   */
  /*async list(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.imagesModel.imagesCollection.find()
        .exec(function (err, users) {
          if (err) {
            reject(err);
          } else {
            console.log(users)
            resolve(users);
          }
        })
    });
  }*/

  /**
   * Asynchronous function which retrieves a image given its id
   * 
   * @param resourceId 
   * 
   * @returns requested user
   */
  async getById(resourceId: string): Promise<any>{
    //console.log(resourceId)
    const image = await this.imagesModel.imagesCollection.findById(resourceId).select(['-_id','-type']);
    //console.log(image)
    return image;
    
  }

  /**
   * Asynchronous function which retrieves all the users according to the passed parameters
   * which act as a filter
   * 
   * @param parameters 
   * 
   * @returns users that are compliant with the parameter passed
   */
  async filterList(parameters: any): Promise<any>{
    return await this.imagesModel.imagesCollection.find(parameters).select(['_id']);
  }
}