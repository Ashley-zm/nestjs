import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '登录名' })
  @IsNotEmpty({ message: '登录名 不能为空' })
  @IsString()
  loginName: string;

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名 不能为空' })
  @IsString()
  userName: string;

  @IsNotEmpty({ message: '密码 不能为空' })
  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;

  @ApiProperty({ required: false, description: '邮箱' })
  @IsString()
  email: string;
}
