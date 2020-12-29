"use strict";

var _tsyringe = require("tsyringe");

var _BCriptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCriptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BCriptHashProvider.default);