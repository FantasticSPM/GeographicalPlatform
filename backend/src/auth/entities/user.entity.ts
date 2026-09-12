import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
    comment: '昵称',
  })
  nick_name: string;

  @Column({
    comment: '用户名',
    unique: true,
  })
  username: string;

  @Column({
    comment: '密码',
  })
  password: string;

  @Column({
    nullable: true,
    comment: '头像',
  })
  avatar: string;

  @Column({
    nullable: true,
    comment: '邮箱',
  })
  email: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  created_at: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updated_at: Date;
}
