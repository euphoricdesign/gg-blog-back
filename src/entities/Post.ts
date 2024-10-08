import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({ nullable: true }) // Imagen opcional
  image?: string;

  @Column()
  createdAt!: string;

  @ManyToOne(() => User, user => user.posts) // Relación correcta con el User
  author!: User;
}
