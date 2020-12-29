import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import SendforgotPasswordEmailService from '@modules/users/services/SendforgotPasswordEmailService';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserTokensRepository from '../repositories/fakes/fakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendforgotPasswordEmailService: SendforgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeMailProvider = new FakeMailProvider();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendforgotPasswordEmailService = new SendforgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  })

  it("should be able to recover the password using the email", async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });

    await sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com",
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {

    await expect(sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: "johndoe@example.com",
      password: "123456"
    });

    await sendforgotPasswordEmailService.execute({
      email: "johndoe@example.com",
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  })
});
