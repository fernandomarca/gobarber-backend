"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _fakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/fakeUsersRepository"));

var _SendforgotPasswordEmailService = _interopRequireDefault(require("./SendforgotPasswordEmailService"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _fakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/fakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendforgotPasswordEmailService;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _fakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _fakeUserTokensRepository.default();
    sendforgotPasswordEmailService = new _SendforgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });
    await sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com"
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });
    await sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com"
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});