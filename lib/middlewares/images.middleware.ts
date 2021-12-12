import { Response, Request, NextFunction } from 'express';
import { ImagesModel } from '../models/images.model';
import { ImagesService } from '../services/images.service'

/**
 * ImageMiddleware class
 * It aims to manage all the requests received:
 * - In case of errors, the HTTP status code is returned
 * - Otherwise the request is allowed to pass
 */
export class ImagesMiddleware {
}