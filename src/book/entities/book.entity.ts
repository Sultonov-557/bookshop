import { Category } from 'src/category/entities/category.entity';
import { RootEntity } from 'src/common/entity/root.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Book extends RootEntity {
  @Column()
  filePath: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @ManyToMany(() => Category, (category) => category.books)
  categorys: Category[];
}
