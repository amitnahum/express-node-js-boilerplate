import { Repository } from 'typeorm';

import { User } from '../models/User';

export class UserRepository extends Repository<User> {
}
