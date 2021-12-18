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
   * Users model
   */
  usersModel: UsersModel; 
  /**
   * Images model
   */
  imagesModel: ImagesModel;

  /**
   * Constructor which initializes the instance of the UsersModel and ImagesModel
   */
  constructor(){ 
    this.usersModel = UsersModel.getInstance();
    this.imagesModel = ImagesModel.getInstance();
  }

   /**
   * Asynchronous function that retrieves all the users id in the database
   * 
   * @returns the list of all the users id in the database
   */
    async list(): Promise<any>{
      const users = await this.usersModel.usersCollection.find().select(['_id', '-__v']).exec();
      return users;
    }
  
  /**
   * Function which retrieves the UsersService instance
   * by creating it if not present
   * 
   * @returns UsersService instance
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

  /**
   * Function which return the max username of the already inserted user
   * 
   * @param resource 
   * 
   * @returns max username
   */
  async getMaxUsername() : Promise<any>{
    const users = await this.usersModel.usersCollection.count();
    if(users !== 0) {
      const user = await this.usersModel.usersCollection.findOne().sort('-username').exec();
      return user.username;
    } else {
      return 0;
    }
  }

  /**
   * Function which return the list of evaluations given the params (userid and type)
   * 
   * @param resource 
   * 
   * @returns list of evaluations
   */
  async filterList(parameters: any): Promise<any>{
    return await this.imagesModel.imagesCollection.find({ "type": parameters.type, "evaluations_list.user_id": parameters.user_id}).select({"evaluations_list.$": 1 });
  }
}