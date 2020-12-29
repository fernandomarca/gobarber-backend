"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IUserRepositories = _interopRequireDefault(require("../repositories/IUserRepositories"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.default === "undefined" ? Object : _IUserRepositories.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    password
  }) {
    const userWithoutPassword = await this.usersRepository.findByEmail(email);

    if (!userWithoutPassword) {
      throw new _AppError.default('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, userWithoutPassword.password);

    if (!passwordMatched) {
      throw new _AppError.default('Incorrect email/password combination.', 401);
    }

    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: userWithoutPassword.id,
      expiresIn
    });
    return {
      userWithoutPassword,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUserService;
exports.default = _default;