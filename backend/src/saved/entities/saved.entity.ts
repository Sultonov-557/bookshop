import { Book } from 'src/book/entities/book.entity';
import { RootEntity } from 'src/common/entity/root.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity()
export class Saved extends RootEntity {
  @OneToOne(() => Book)
  @JoinColumn()
  book: Book;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
