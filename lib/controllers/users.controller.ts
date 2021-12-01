import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';

/**
 * It aims to manage all the operations that involves the user resource
 */
export class UsersController {
  constructor() {}

  /**
   * Asyncronous functions that retrieves the list of users from the DB
   * and sends it back with the status code 200 otherwise 500
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
      const userId = await usersService.create(req.body);
      res.status(201).send(userId);
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
   * sends back the requested user with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async getById(req: Request, res: Response): Promise<void> {
    res.status(405).json({ error: 'Method not allowed' });
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