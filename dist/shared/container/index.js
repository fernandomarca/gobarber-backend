"use strict";

var _tsyringe = require("tsyringe");

var _AppointmentRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

var _CreateNotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/CreateNotificationsRepository"));

require("../../modules/users/providers");

require("./providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _CreateNotificationsRepository.default);