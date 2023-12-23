import { Repository } from 'typeorm';

import { User } from '../models/User';
import { MainDataSource } from '../data-sources/main';
import { DataSourceLoader } from '../decorators/DataSourceLoader';

@DataSourceLoader(User, () => MainDataSource)
export class UserRepository extends Repository<User> {
}
