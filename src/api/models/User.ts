import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

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

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }
}
