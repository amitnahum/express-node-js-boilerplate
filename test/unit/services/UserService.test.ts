import { User } from '../../../src/api/models/User';
import { UserService } from '../../../src/api/services/UserService';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('UserService', () => {

    test('Find should return a list of users', async () => {
        const log = new LogMock();
        const repo = new RepositoryMock<User>();
        const user = new User();
        user.id = '1';
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'john.doe@test.com';
        repo.list = [user];
        const userService = new UserService(repo as any, log);
        const list = await userService.find();
        expect(list[0].firstName).toBe(user.firstName);
    });
});
