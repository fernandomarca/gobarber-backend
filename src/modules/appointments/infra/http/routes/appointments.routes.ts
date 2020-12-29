import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensuraAuthenticated);

appointmentsRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required()
  }
}), appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;


