import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from "./UserRole.entity";

@Entity("user", { schema: "vite_node" })
export class User extends BaseEntity {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ApiProperty({ description: '密码' })
  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @ApiProperty({ description: '性别' })
  @Column("int", { default: 1, name: "sex",})
  sex?: number;

  @ApiProperty({ description: '邮箱' })
  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @ApiProperty({ description: '地址' })
  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @ApiProperty({ description: '登录名' })
  @Column("varchar", { name: "login_name", length: 255 })
  loginName: string;

  @ApiProperty({ description: '用户名' })
  @Column("varchar", { name: "user_name", length: 255 })
  userName: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];
}
