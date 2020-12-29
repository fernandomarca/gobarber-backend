"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _fakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/fakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _fakeBCriptHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/fakeBCriptHashProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUser;
let fakeCacheProvider;
describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new _fakeUsersRepository.default();
    fakeHashProvider = new _fakeBCriptHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it("should be able to create a new User", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');
  });
  it("should not be able to create a new User with same email from another", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    await expect(createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});