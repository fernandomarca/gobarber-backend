"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserTokensRepository {
  constructor() {
    this.usersTokens = [];
  }

  async generate(user_id) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuid.v4)(),
      token: (0, _uuid.v4)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.usersTokens.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = this.usersTokens.find(user => user.token === token);
    return userToken;
  } // public async create(userData: ICreateUserDTO): Promise<User> {
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

var _default = FakeUserTokensRepository;
exports.default = _default;