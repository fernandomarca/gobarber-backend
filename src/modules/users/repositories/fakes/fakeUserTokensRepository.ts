import { v4 as uuid } from 'uuid';
import UserToken from '../../infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';


class FakeUserTokensRepository implements IUserTokensRepository {

  private usersTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {

    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(user => user.token === token);

    return userToken;
  }

  // public async create(userData: ICreateUserDTO): Promise<User> {
  //   const user = new User();

  //   Object.assign(user, { id: uuid() }, userData);

  //   this.users.push(user);

  //   return user;
  // }

  // public async save(user: User): Promise<User> {
  //   const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

  //   this.users[findIndex] = user;

  //   return user;
  // }

}

export default FakeUserTokensRepository;
