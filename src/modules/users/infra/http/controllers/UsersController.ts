//index,show,create,update,delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';


export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {

    try {

      const { name, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);

      const user = await createUserService.execute({
        name,
        email,
        password
      });

      return response.status(201).json(classToClass(user));

    } catch (error) {

      return response.status(400).json({
        error: error.message
      });
    }

  }
}
