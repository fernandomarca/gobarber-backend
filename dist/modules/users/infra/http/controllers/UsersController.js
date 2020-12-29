"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index,show,create,update,delete
class UsersController {
  async create(request, response) {
    try {
      const {
        name,
        email,
        password
      } = request.body;

      const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

      const user = await createUserService.execute({
        name,
        email,
        password
      });
      return response.status(201).json((0, _classTransformer.classToClass)(user));
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.default = UsersController;