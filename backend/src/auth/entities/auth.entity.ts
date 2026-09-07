import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity('auth_session')
export class Auth {
  @PrimaryColumn()
  id: string;

  @Column({
    comment: '用户id',
  })
  user_id: number;

  @Column({
    comment: 'refresh_token的hash',
  })
  refresh_token: string;

  @Column({
    comment: '登录时的ip地址',
  })
  ip_address: string;

  @Column({
    comment: '过期时间',
  })
  expires_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: '撤销时间',
  })
  revoked_at: Date | null;

  @Column({
    comment: '创建时间',
  })
  created_at: Date;

  @Column({
    comment: '更新时间',
  })
  updated_at: Date;
}
