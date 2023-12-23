import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { config } from '../../config';
import { Service } from 'typedi';
import path from 'path';
import { Post } from '../models/Post';

const {
    type,
    port,
    username,
    password,
    host,
    database
} = config.databases.main as any;

@Service()
export class MainDataSource extends DataSource {
    constructor() {
        super({
            connectString: 'default',
            applicationName: 'default',
            type,
            host,
            port,
            username,
            password,
            database,
            synchronize: true,
            logging: true,
            entities: [User, Post],
            subscribers: [],
            migrations: [path.join(__dirname, '/database/migrations/*.ts')],
        });
    }
}

