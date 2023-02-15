import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/User.entity';

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
    // async findAll(query: { keyWord: string, pageCurrent: number, pageSize: number }): Promise<User[]> {
    const list = await this.userRepository.find({
      where: [
        { loginName: Like(`%${query.keyWord}%`) },
        { userName: Like(`%${query.keyWord}%`) }
      ],
      order: {
        id: "DESC"
      },
      skip: (query.pageCurrent - 1) * query.pageSize,
      take: query.pageSize
    })
    const total = list.length
    return { list, total }
    // return await this.userRepository.query('select * from user');
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
  async findOne(id: number) {
    return await this.userRepository.find({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
