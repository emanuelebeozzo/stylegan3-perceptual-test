import { Request, Response } from 'express';
import { CommonController } from '../common/controllers/common.controller';
import { ImagesService } from '../services/images.service';

/**
 * UserController class, it implements the {@link CRUDController} interface.
 * It aims to manage all the operations that involves the user resource
 */
export class ImagesController {
  /**
   * Asyncronous functions that retrieves the list of users from the DB
   * and sends it back with the status code 200 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async list(req: Request, res: Response): Promise<void>{
    const imagesService = ImagesService.getInstance();
    let real: any;
    let fake: any;
    let merged: any;
    try{
      real = await imagesService.filterList({type:0});
      CommonController.extractIds(real);
      CommonController.shuffleArray(real);
      real = real.slice(0,15); //TODO modify to 15
      console.log(real);
      fake = await imagesService.filterList({type:1});
      CommonController.extractIds(fake);
      CommonController.shuffleArray(fake);
      fake = fake.slice(0,15); //TODO modify to 15
      console.log(fake);
      merged = [... real, ... fake]
      CommonController.shuffleArray(merged);
      res.status(200).send(merged);
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
   * Asyncronous functions that inserts the new user in the DB, sends back
   * the location of the new element with the status code 201 otherwise 500
   * @param req express Request object
   * @param res express Response object
   */
  async create(req: Request, res: Response): Promise<void> {
    // TODO: decidere se inserire a mano o meno 
    res.status(405).json({ error: 'Method not allowed' });  
  }

  async createEval(req: Request, res: Response): Promise<void> {
    const imagesService = ImagesService.getInstance();
    try{
      req.body._id = req.params.id;
      const evalId = await imagesService.createEval(req.body);
      res.status(201).send(evalId);
    }catch(e){
      res.status(500).json({error: 'Internal server error'});
    }
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
      const image = await imagesService.getById(req.params.id);
      res.status(200).send(image);
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