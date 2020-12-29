//index,show,create,update,delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticateUserService);

    const { userWithoutPassword, token } = await authenticatedUser.execute({
      email,
      password
    });

    return response.json({ user: classToClass(userWithoutPassword), token });

  }
}

// const user =
    // {
    //   ...userWithoutPassword,
    //   password: undefined,
    // }
