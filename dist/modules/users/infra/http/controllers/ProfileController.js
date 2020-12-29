"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const user_id = request.user.id;

    const showProfileService = _tsyringe.container.resolve(_ShowProfileService.default);

    const user = await showProfileService.execute({
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    try {
      const user_id = request.user.id;
      const {
        name,
        email,
        password,
        old_password
      } = request.body;

      const updateProfileService = _tsyringe.container.resolve(_UpdateProfileService.default);

      const user = await updateProfileService.execute({
        user_id,
        name,
        email,
        password,
        old_password
      });
      return response.status(201).json((0, _classTransformer.classToClass)(user));
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.default = ProfileController;