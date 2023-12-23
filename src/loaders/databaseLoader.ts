import { Container } from 'typedi';
import { MainDataSource } from '../api/data-sources/main';
import { Logger } from '../lib/logger/Logger';
import { UserRepository } from '../api/repositories/UserRepository';
import { DataSource } from 'typeorm';
import { User } from '../api/models/User';

function linkRepositories(dataSource: DataSource,) {
    Container.set(UserRepository.name, dataSource.getRepository(User).extend(UserRepository));
}

export const databaseLoader = async () => {
    const logger = Container.get(Logger);
    try {
        const dataSource = Container.get(MainDataSource);
        await dataSource.initialize();

        logger.info('Data Source main has been initialized');
        linkRepositories(dataSource);
    } catch (e) {
        console.error(e);
        logger.error('Data Source main failed initialization');
    }
};
