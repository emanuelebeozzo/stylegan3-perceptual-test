import { Application } from 'express';
import { CommonRoutes } from '../common/routes/common.routes'
import { ConfigureRoutes } from '../common/interfaces/configureRoutes.interface'
import { UsersController } from  '../controllers/users.controller'
import { UsersMiddleware } from '../middlewares/users.middleware'

/**
 * UserRoutes class, it extends the {@link CommonRoutes} class and implements the {@link ConfigureRoutes} interface.
 * It aims to manage all the requests received for the resource _/images_.
 * It sets the middlewares and the methods that should be called for a specific operation
 */
export class UsersRoutes extends CommonRoutes implements ConfigureRoutes {

  /**
   * Constructor that calls the consutructor of CommonRoutes and calls the method that define all the routes
   * 
   * @param app instance of the node.js server
   */
  constructor(app: Application){
    super(app, 'UsersRoutes');
    this.configureRoutes();
  }

  /**
   * Configures the route for each HTTP method in the CRUD interfaces for user resources 
   */
  configureRoutes(): void {
    /** Instance of user controller that implements the logic of rest method*/
    const usersController: UsersController = new UsersController();
    /** Instance of user middleware that checks every request on user resources*/
    const usersMiddleware: UsersMiddleware = new UsersMiddleware();

    /**
     * Route for the get method on the entire collection of users
     * The request is routed only to user controller function for get all (list)
    */
    this.app.get('/api/images', [
      usersController.list
    ]);

    /** 
     * Route for the get method on a single user with a specific id 
     * The request is routed through a middlewares that check the existance of the id to retrieve
     * Then the request is routed to the appropriate user controller function for getById
    */
    this.app.get('/api/users/:id', [
      usersController.getById
    ]);

    /** 
     * Route for the post method (insert resource) on the users resources 
     * The request is routed through a series of middlewares that check the validitity of 
     * Name, surname, email password, role and birth_date
     * Then the request is routed to the appropriate user controller function for create
    */
    this.app.post('/api/users', [
      usersController.create
    ]);

    /** 
     * Route for the patch method on the entire collection of users
     * The request is routed only to user controller function for updateAll
    */
    this.app.patch('/api/users', [
      usersController.updateAll
    ]);

    /**
     * Route for the patch method (update resource) on a single users 
     * The request is routed through a series of middlewares that check the existence of the id to update
     * The middlewares also check the validity of the body and of the request
     * Then the request is routed to the appropriate user controller function for UpdateById
    */
    this.app.patch('/api/users/:id', [
      usersController.updateById
    ]);

    /**
     * Route for the delete method on a single users 
     * The request is routed through a middleware that check the existence of the id to delete
     * Then the request is routed to the appropriate user controller function for deleteById
    */
    this.app.delete('/api/users/:id',[
      usersController.deleteById
    ]);

    /** Define the route for the delete method on the entire collection of users
     * The request is routed only to user controller function for deleteAll
    */
    this.app.delete('/api/users',[
      usersController.deleteAll
    ]);

    /** 
     * 
    */
     this.app.get('/api/users/:id/evaluations', [
      usersController.getEval
    ]);
  }
}