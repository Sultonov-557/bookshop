import { Book } from 'src/book/entities/book.entity';
import { RootEntity } from 'src/common/entity/root.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Category extends RootEntity {
  @Column()
  name: string;

  @ManyToMany(() => Book, (book) => book.categorys)
  @JoinTable()
  books: Book[];
}
