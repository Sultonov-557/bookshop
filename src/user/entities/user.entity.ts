import { RootEntity } from 'src/common/entity/root.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends RootEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  telegramID: string;
}
