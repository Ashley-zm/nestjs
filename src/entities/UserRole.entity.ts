import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role.entity';
import { User } from './User.entity';

@Index('RoleId', ['roleId'], {})
@Index('UserId', ['userId'], {})
@Entity('user_role', { schema: 'vite_node' })
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'URId', comment: '关联id' })
  urId: number;

  @Column('int', { name: 'UserId', nullable: true, comment: '用户id' })
  userId: number | null;

  @Column('int', { name: 'RoleId', nullable: true, comment: '角色id' })
  roleId: number | null;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'RoleId', referencedColumnName: 'rid' }])
  role: Role;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: User;
}
