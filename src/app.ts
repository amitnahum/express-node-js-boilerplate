import 'reflect-metadata';
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers';
import { config } from './config';
import winston from 'winston';
import { useContainer as ormUseContainer } from 'typeorm';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { Container } from 'typedi';
import * as path from 'path';
import { winstonLoader } from './loaders/winstonLoader';
import { databaseLoader } from './loaders/databaseLoader';

routingUseContainer(Container);
// ormUseContainer(Container);
classValidatorUseContainer(Container);

async function bootUpApp() {
    winstonLoader();
    const app = createExpressServer({
        cors: true,
        classTransformer: true,
        defaultErrorHandler: false,
        middlewares: [path.join(__dirname, '/api/middlewares/*.ts')],
        controllers: [path.join(__dirname, '/api/controllers/*.ts')],
    });

    await databaseLoader();
    app.listen(config.app.port, () => {
        winston.info(`Server is listening on ${config.app.port}`);
    });
}

bootUpApp()
    .catch(e => console.error(e));

