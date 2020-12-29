"use strict";

var _fakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/fakeUsersRepository"));

var _ListProviderService = _interopRequireDefault(require("./ListProviderService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let listProviderService;
let fakeCacheProvider;
describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _fakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderService = new _ListProviderService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it("should be able to list the providers", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });
    const user2 = await fakeUsersRepository.create({
      name: "John trê",
      email: "johntre@example.com",
      password: "123456"
    });
    const loggedUser = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@example.com",
      password: "123456"
    });
    const providers = await listProviderService.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});