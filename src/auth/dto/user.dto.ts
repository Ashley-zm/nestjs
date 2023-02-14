import { IsString,IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: '登录名' })
  @IsNotEmpty({ message: '登录名 不能为空' }) 
  @IsString()
  loginName: string;
  
  @IsNotEmpty({ message: '密码 不能为空' }) 
  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;
}
