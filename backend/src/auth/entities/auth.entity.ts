import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth_session')
export class Auth {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    comment: '用户id',
  })
  user_id: string;

  @Column({
    nullable: true,
    comment: 'refresh_token的hash',
  })
  refresh_token_hash: string;

  @Column({
    comment: '登录时的ip地址',
  })
  ip_address: string;

  @Column({
    comment: '登录时的设备信息',
    nullable: true,
  })
  device: string;

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

  @CreateDateColumn({
    comment: '创建时间',
  })
  created_at: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updated_at: Date;
}
