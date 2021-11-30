import { Request, Response } from 'express';
import { ImagesService } from '../services/images.service';

/**
 * UserController class, it implements the {@link CRUDController} interface.
 * It aims to manage all the operations that involves the user resource
 */
export class ImagesController {
  constructor() {}

  /**
   * Asyncronous functions that retrieves the list of users from the DB
   * and sends it back with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async list(req: Request, res: Response): Promise<void>{
    /*const userService = UserService.getInstance();
    let users: any;
    try{
      users = await userService.list();
      if(req.query && Object.keys(req.query).length !== 0){
        users = await userService.filterList(req.query);
      }else{
        users = await userService.list();
      }
      res.status(200).send(users);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }*/
  }
  
  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async updateAll(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }

  /**
   * Asyncronous functions that inserts the new user in the DB, sends back
   * the location of the new element with the status code 201 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async create(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });  
  }
  
  /**
   * Asyncronous functions that retrieves a user with a specific id from the DB,
   * sends back the requested user with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async getById(req: Request, res: Response): Promise<void> {
    const imagesService = ImagesService.getInstance();
    try{
      const type = await imagesService.getById(req.params.id);
      res.status(200).send(type);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }

  /**
   * Asyncronous functions that updates a user with a specific id in the DB
   * sends back the updated user with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async updateById(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }

  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async deleteAll(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }

  /**
   * Asyncronous functions that deletes a user with a specific id in the DB
   * sends back the status code 204 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async deleteById(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }  
}