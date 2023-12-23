import 'reflect-metadata';
import { Param, Body, Get, Post, Put, Delete, JsonController, OnUndefined, Req } from 'routing-controllers';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
import { ResponseSchema } from 'routing-controllers-openapi';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { UserNotFoundError } from '../errors/';
import { Inject, Service } from 'typedi';
import { Logger } from '../../lib/logger/Logger';

class BaseUser {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public username: string;
}

export class UserResponse extends BaseUser {
    @IsUUID()
    public id: string;
}

class CreateUserBody extends BaseUser {
    @IsNotEmpty()
    public password: string;
}

@Service()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService,
        private readonly log: Logger
    ) {
        this.log.info('UserController instantiated');
    }

    @Get()
    @ResponseSchema(UserResponse, {isArray: true})
    public find(): Promise<User[]> {
        this.log.info(`Find user controller`);
        return this.userService.find();
    }

    @Get('/me')
    @ResponseSchema(UserResponse, {isArray: true})
    public findMe(@Req() req: any): Promise<User[]> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse)
    public one(@Param('id') id: string): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Post()
    @ResponseSchema(UserResponse)
    public create(@Body() body: CreateUserBody): Promise<User> {
        const user = new User();
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.username = body.username;

        return this.userService.create(user);
    }

    @Put('/:id')
    @ResponseSchema(UserResponse)
    public update(@Param('id') id: string, @Body() body: BaseUser): Promise<User> {
        const user = new User();
        user.email = body.email;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.username = body.username;

        return this.userService.update(id, user);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}
