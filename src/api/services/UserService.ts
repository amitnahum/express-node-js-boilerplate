import { Inject, Service } from 'typedi';
import { Logger } from '../../lib/logger/Logger';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';
import uuid from 'uuid';

@Service()
export class UserService {

    constructor(
        @Inject("UserRepository") private userRepository: UserRepository,
        private readonly log: Logger
    ) {
        this.log.info(`User service instantiated`);
    }

    public find(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | null> {
        this.log.info('Find one user');
        return this.userRepository.findOne({
            where: {id}
        });
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        user.id = uuid.v1();
        return this.userRepository.save(user);
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }
}
