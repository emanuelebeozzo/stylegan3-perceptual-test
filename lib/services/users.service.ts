import { UsersModel } from '../models/users.model';

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

  /**
   * Constructor which initializes the instance of the UserModel
   */
  constructor(){ 
    this.usersModel = UsersModel.getInstance();
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
    await user.save();
    return user._id;
  }
}