import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Post } from './Post';

@Entity()
export class User {
    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({name: 'first_name'})
    public firstName: string;

    @IsNotEmpty()
    @Column({name: 'last_name'})
    public lastName: string;

    @IsNotEmpty()
    @Column()
    public email: string;

    @IsNotEmpty()
    @Column()
    public username: string;

    @OneToMany(type => Post, post => post.user)
    public posts: Post[];

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }
}
