import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Timestamp } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { User } from './User';

@Entity()
export class Post {
    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column({
        type: "timestamptz",
    })
    public date: Date;

    @IsNotEmpty()
    @Column({type: "text"})
    public contents: string;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: string;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({name: 'user_id'})
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
