import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entities/User.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

  userLogin() {
    return `test user/saerch`;
  }

  create(createUserDto: CreateUserDto) {
    const { userName,loginName, password } = createUserDto;

    const user = new User();
    user.userName = userName;
    user.loginName = loginName;
    user.password = password;
    user.sex = 1;
    
    return this.userRepository.save(user);
  }

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
