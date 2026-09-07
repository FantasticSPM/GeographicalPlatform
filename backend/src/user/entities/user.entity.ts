import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
    comment: '最近一次登录时间',
  })
  last_login_at: Date;

  @Column({
    comment: '创建时间',
  })
  created_at: Date;

  @Column({
    comment: '更新时间',
  })
  updated_at: Date;
}
