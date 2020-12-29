import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import UsersController from '../controllers/UsersController';

import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig.multer);


usersRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), usersController.create);

usersRouter.patch('/avatar', ensuraAuthenticated, upload.single('avatar'), usersAvatarController.update);
export default usersRouter;
