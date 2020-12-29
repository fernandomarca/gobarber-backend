import 'reflect-metadata';
import 'dotenv/config';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import '@shared/infra/typeorm';
import '@shared/container';
import rateLimiter from '@shared/middleware/rateLimiter';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(rateLimiter);

app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
    err
  })
});

app.listen(process.env.PORT || 3333, () => {
  console.log('server started on port 3333');
});
