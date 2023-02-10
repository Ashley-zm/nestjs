import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleMenu } from "./RoleMenu.entity";
import { UserRole } from "./UserRole.entity";

@Entity("role", { schema: "vite_node" })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "RID" })
  rid: number;

  @Column("varchar", { name: "RName", nullable: true, length: 255 })
  rName: string | null;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.role)
  roleMenus: RoleMenu[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
