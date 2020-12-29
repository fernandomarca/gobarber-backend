"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendforgotPasswordEmailService = _interopRequireDefault(require("../../../services/SendforgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index,show,create,update,delete
class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordEmailService = _tsyringe.container.resolve(_SendforgotPasswordEmailService.default);

    await sendForgotPasswordEmailService.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;