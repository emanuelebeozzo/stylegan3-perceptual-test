import { Response, Request, NextFunction } from 'express';
import { UsersModel } from '../models/users.model';
import { UsersService } from '../services/users.service'

/**
 * UserMiddleware class
 * It aims to manage all the requests received:
 * - In case of errors, the HTTP status code is returned
 * - Otherwise the request is allowed to pass
 */
export class UsersMiddleware {
}