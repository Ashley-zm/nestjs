import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role.entity";
import { Menu } from "./Menu.entity";

@Index("RoleId", ["roleId"], {})
@Index("MenuId", ["menuId"], {})
@Entity("role_menu", { schema: "vite_node" })
export class RoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "RMId", comment: "关联id" })
  rmId: number;

  @Column("int", { name: "RoleId", nullable: true, comment: "角色id" })
  roleId: number | null;

  @Column("int", { name: "MenuId", nullable: true, comment: "菜单id" })
  menuId: number | null;

  @ManyToOne(() => Role, (role) => role.roleMenus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "RoleId", referencedColumnName: "rid" }])
  role: Role;

  @ManyToOne(() => Menu, (menu) => menu.roleMenus, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "MenuId", referencedColumnName: "menuId" }])
  menu: Menu;
}
