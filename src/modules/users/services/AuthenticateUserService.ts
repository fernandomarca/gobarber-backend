import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUserRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  userWithoutPassword: User;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const userWithoutPassword = await this.usersRepository.findByEmail(email);

    if (!userWithoutPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, userWithoutPassword.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userWithoutPassword.id,
      expiresIn,
    })

    return {
      userWithoutPassword,
      token
    };

  }
}

export default AuthenticateUserService;
