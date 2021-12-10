import { UsersModel } from '../models/users.model';
import { ImagesModel } from '../models/images.model';
import { type } from 'os';

/**
 * It aims to manage all the operations that involve the _user_ resource
 * by interacting with the database
 */
export class UsersService {
  /**
   * UserService instance
   */
  private static instance: UsersService;
  /**
   * Images model
   */
  usersModel: UsersModel; 
  imagesModel: ImagesModel;

  /**
   * Constructor which initializes the instance of the UserModel
   */
  constructor(){ 
    this.usersModel = UsersModel.getInstance();
    this.imagesModel = ImagesModel.getInstance();
  }

  /**
   * Function which retrieves the UserService instance
   * by creating it if not present
   * 
   * @returns UserService instance
   */
   static getInstance(): UsersService {
    if (!UsersService.instance) {
      UsersService.instance = new UsersService();
    }
    return UsersService.instance;
  }

  /**
   * Function which creates the user resource record
   * 
   * @param resource 
   * 
   * @returns id of the created resource
   */
  async create(resource: any) : Promise<any>{
    const user = new this.usersModel.usersCollection(resource);
    //console.log(user);
    await user.save();
    return user._id;
  }

   /**
   * Function which creates the user resource record
   * 
   * @param resource 
   * 
   * @returns id of the created resource
   */
    async getById(resourceId: any) : Promise<any>{
      //console.log(resourceId)
      const user = await this.usersModel.usersCollection.findById(resourceId).select(['-_id', '-__v']);
      //console.log(user)
      return user;
    }


  async getMaxUsername() : Promise<any>{
    const users = await this.usersModel.usersCollection.count();
    if(users !== 0) {
      const user = await this.usersModel.usersCollection.findOne().sort('-username').exec();
      return user.username;
    } else {
      return 0;
    }
  }

  async filterList(parameters: any): Promise<any>{
    return await this.imagesModel.imagesCollection.find({ "type": parameters.type, "evaluations_list.user_id": parameters.user_id}).select({"evaluations_list.$": 1 });
  }
}