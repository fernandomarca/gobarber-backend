"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensuraAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensuraAuthenticated"));

var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));

var _ProviderDayAvaiabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvaiabilityController"));

var _ProviderMonthAvaiabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvaiabilityController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providerDayAvaiabilityController = new _ProviderDayAvaiabilityController.default();
const providerMonthAvaiabilityController = new _ProviderMonthAvaiabilityController.default();
providersRouter.use(_ensuraAuthenticated.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerMonthAvaiabilityController.index);
providersRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providerDayAvaiabilityController.index);
var _default = providersRouter;
exports.default = _default;