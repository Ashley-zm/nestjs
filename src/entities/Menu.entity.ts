import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoleMenu } from "./RoleMenu.entity";

@Entity("menu", { schema: "vite_node" })
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "MenuId", comment: "菜单id" })
  menuId: number;

  @Column("varchar", {
    name: "MenuName",
    nullable: true,
    comment: "菜单name",
    length: 255,
  })
  menuName: string | null;

  @Column("int", { name: "ParentId", nullable: true, comment: "父菜单id" })
  parentId: number | null;

  @Column("varchar", {
    name: "IsMenu",
    nullable: true,
    comment: "是否是菜单",
    length: 255,
  })
  isMenu: string | null;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.menu)
  roleMenus: RoleMenu[];
}
