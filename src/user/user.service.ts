import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/User.entity';
import { Role } from '../entities/Role.entity';
import { UserRole } from '../entities/UserRole.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
// 测试加密
import { Encrypt } from 'src/utils/crypto'
// import { User } from 'src/entities/User.entity';

@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  // 引入 InjectRepository typeOrm 依赖注入 接受一个实体
  // 引入类型 Repository 接受实体泛型
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * @description: 创建用户
   * @param createUserDto 
   * @returns 
   */
  async create(createUserDto: CreateUserDto) {
    const { userName, loginName, password } = createUserDto;
    const userInfo = await this.findOneByLoginName(loginName);
    if (userInfo.length > 0) {
      return { flag: false, msg: "登录名已存在" }
    }
    const user = new User();
    user.userName = userName;
    user.loginName = loginName;
    user.password = Encrypt(password);
    user.sex = 1;

    return this.userRepository.save(user);
  }

  /**
   * @description: 查询所有用户
   * @param query 
   * @returns 
   */
  async findAll(query: { keyWord: string, pageCurrent: number, pageSize: number }) {
      const list = await this.userRepository.query(`
      SELECT u.user_name userName,
      u.login_name loginName,
      u.id,
      u.address,
      u.password,
      u.sex,
      u.email,
      r.RName roleName,
      r.RID roleId from user u
      LEFT JOIN user_role ur on u.id=ur.UserId
      LEFT JOIN role r on ur.RoleId=r.RID
      where u.login_name LIKE '%${query.keyWord}%' OR u.user_name LIKE '%${query.keyWord}%'
      LIMIT ${(query.pageCurrent - 1) * query.pageSize}, ${query.pageSize}
      `)    
    // async findAll(query: { keyWord: string, pageCurrent: number, pageSize: number }): Promise<User[]> {
    // const list = await this.userRepository.find({
    //   relations: [
    //     'userRoles',
    //   ],
    //   where: [
    //     { loginName: Like(`%${query.keyWord}%`) },
    //     { userName: Like(`%${query.keyWord}%`) }
    //   ],
    //   order: {
    //     id: "DESC"
    //   },
    //   skip: (query.pageCurrent - 1) * query.pageSize,
    //   take: query.pageSize
    // })
    const total = list.length
    return { list, total }
  }

  /**
   * @description: 查询是否存在此用户，登录名不重复
   * @param loginName 
   * @returns 
   */
  async findOneByLoginName(loginName: string): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        loginName: loginName
      }
    });
  }

  /**
   * @description: 根据id查找用户信息（角色）
   * @param id 
   * @returns 
   */
  async getUserRole(id: number) {
    // 查询角色
    const role = await this.userRepository.query(`select r.* from role r
    INNER JOIN user_role ur ON ur.RoleId=r.RID
    WHERE ur.UserId=${id}`);
    const roleInfo = JSON.parse(JSON.stringify(role[0]))
    // 根据角色id查菜单
    const resourceInfo = await this.userRepository.query(`select m.code from menu m
    INNER JOIN role_menu rm ON rm.MenuId=m.MenuId
    WHERE rm.RoleId=${roleInfo.RID} and m.code is not null;`);
    console.log(resourceInfo);
    console.log(JSON.stringify(resourceInfo));
    
    const arr = resourceInfo.map((item: any) => {
      return JSON.parse(JSON.stringify(item)).code
    }).toString()
    return {
      roleInfo,
      resourceInfo: arr
    };
  }
  /**
   * @description: 根据id查找用户信息
   * @param id 
   * @returns 
   */
  async findOne(id: number) {
    return await this.userRepository.find({
      where: {
        id: id
      }
    });
  }

  /**
   * @description 更新用户
   * @param id 
   * @param updateUserDto 
   * @returns 
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * @description 删除用户
   * @param id 
   * @returns 
   */
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
