import { Container } from 'typedi';
import { MainDataSource } from '../api/data-sources/main';
import { Logger } from '../lib/logger/Logger';

export const databaseLoader = async () => {
    const logger = Container.get(Logger);
    try {
        const dataSource= Container.get(MainDataSource);
        await dataSource.initialize();

        logger.info('Data Source main has been initialized');
    } catch (e) {
        console.error(e);
        logger.error('Data Source main failed initialization');
    }
};
