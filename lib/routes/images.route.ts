import { Application } from 'express';
import { CommonRoutes } from '../common/routes/common.routes'
import { ConfigureRoutes } from '../common/interfaces/configureRoutes.interface'
import { ImagesController } from  '../controllers/images.controller'
import { ImagesMiddleware } from '../middlewares/images.middleware'

/**
 * ImagesRoute class, it extends the {@link CommonRoutes} class and implements the {@link ConfigureRoutes} interface.
 * It aims to manage all the requests received for the resource _/images_.
 * It sets the middlewares and the methods that should be called for a specific operation
 */
export class ImagesRoutes extends CommonRoutes implements ConfigureRoutes {

  /**
   * Constructor that calls the consutructor of CommonRoutes and calls the method that define all the routes
   * 
   * @param app instance of the node.js server
   */
  constructor(app: Application){
    super(app, 'ImagesRoutes');
    this.configureRoutes();
  }

  /**
   * Configures the route for each HTTP method in the CRUD interfaces for user resources 
   */
  configureRoutes(): void {
    /** Instance of images controller that implements the logic of rest method*/
    const imagesController: ImagesController = new ImagesController();
    /** Instance of images middleware that checks every request on user resources*/
    const imagesMiddleware: ImagesMiddleware = new ImagesMiddleware();

    /**
     * Route for the get method on collection of images
     * The request is routed only to images controller function for get 30 random images
    */
    this.app.get('/api/images', [
      imagesController.list
    ]);

    /** 
     * Route for the get method on a single images with a specific id 
     * The request is routed to the appropriate images controller function for getById
    */
    this.app.get('/api/images/:id', [
      imagesController.getById
    ]);

    /** 
     * Route for the post method (insert resource) on the images resources 
     * Then the request is routed to the appropriate image controller function for create
    */
    this.app.post('/api/images', [
      imagesController.create
    ]);

    /** 
     * Route for the post method (insert resource) on the evaluation on a specific image resources
     * Then the request is routed to the appropriate image controller function for the creation of the resource
     * The body must contains an id of the user and the evaluation 
     * TODO: chech the validity with middleware
    */
    this.app.post('/api/images/:id/evaluations', [
      imagesController.createEval
    ]);


    /** 
     * Route for the patch method on the entire collection of images
     * The request is routed only to images controller function for updateAll
    */
    this.app.patch('/api/images', [
      imagesController.updateAll
    ]);

    /**
     * Route for the patch method (update resource) on a single image 
     * The request is routed only to the appropriate image controller function for UpdateById
    */
    this.app.patch('/api/images/:id', [
      imagesController.updateById
    ]);

    /**
     * Route for the delete method on a single image 
     * The request is routed oly to the appropriate image controller function for deleteById
    */
    this.app.delete('/api/images/:id',[
      imagesController.deleteById
    ]);

    /** Define the route for the delete method on the entire collection of images
     * The request is routed only to images controller function for deleteAll
    */
    this.app.delete('/api/images',[
      imagesController.deleteAll
    ]);
  }
}