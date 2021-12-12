import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

/**
 * It aims to manage all the operations that involves the user resource
 */
export class UsersController {
  constructor() {}

  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async list(req: Request, res: Response): Promise<void>{
    res.status(405).json({ error: 'Method not allowed' });
  }

  /**
   * Asyncronous functions that inserts the new user in the DB, sends back
   * the location of the new element with the status code 201 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async create(req: Request, res: Response): Promise<void> {
    const usersService = UsersService.getInstance();
    try{
      const maxUsername = await usersService.getMaxUsername();
      const userId = await usersService.create({"username":(maxUsername+1)});
      res.status(201).location('api/users/' + userId).send(userId);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
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
   * Asyncronous functions that retrieves a user with a specific id from the DB,
   * sends back the requested username of a user with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async getById(req: Request, res: Response): Promise<void> {
    const usersService = UsersService.getInstance();
    try{
      const user = await usersService.getById(req.params.id);
      res.status(200).send(user);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  }

  /**
   * Asyncronous functions which is not allowed, it sends back error code 405
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
   * Asyncronous functions which is not allowed, it sends back error code 405
   * @param req express Request object
   * @param res express Response object
   */
  async deleteById(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
  }  

  /**
   * Asyncronous functions that return the evaluations inserted by a specific user with a specific id 
   * sends back the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
   async getEval(req: Request, res: Response): Promise<void> {
    const usersService = UsersService.getInstance();
    let evaluations: any;
    try{
      let realEval:any = await usersService.filterList({ type: 0, user_id : req.params.id });
      let genEval: any = await usersService.filterList({ type: 1, user_id : req.params.id });
      evaluations = {
        real : realEval,
        gen : genEval
      }
      res.status(200).send(evaluations);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
  } 
}