"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _fakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/fakeUsersRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _fakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/fakeUserTokensRepository"));

var _fakeBCriptHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/fakeBCriptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeHashProvider;
let resetPasswordService;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _fakeUsersRepository.default();
    fakeUserTokensRepository = new _fakeUserTokensRepository.default();
    fakeHashProvider = new _fakeBCriptHashProvider.default();
    resetPasswordService = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it("should be able to reset the password", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: "123123",
      token
    });
    const updateUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
  });
  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset the password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPasswordService.execute({
      token: token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("should not be able to reset the password if passed more than 2 hours", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPasswordService.execute({
      password: "123123",
      token
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});