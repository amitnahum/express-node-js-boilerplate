import * as dotenv from 'dotenv';
import { normalizePort } from './lib/config/utils';

/**
 * Load .env file .
 */
dotenv.config();

export const config = {
    app: {
        port: normalizePort(process.env.APP_PORT) || 3000
    },
    databases: {
        main: {
            type: process.env.MAIN_DATABASE_TYPE || 'postgres',
            host: process.env.MAIN_DATABASE_HOST || 'localhost',
            port: normalizePort(process.env.MAIN_DATABASE_PORT) || 5432,
            username: process.env.MAIN_DATABASE_USERNAME || "test",
            password: process.env.MAIN_DATABASE_PASSWORD || "test",
            database: process.env.MAIN_DATABASE_DATABASE || "test",
        }
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        output: process.env.LOG_OUTPUT || '',
    }
};
