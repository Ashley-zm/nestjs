import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiValidationPipe } from '../pipe/JoiValidation.pipe';
import { creatUserSchema } from './creatUserSchema';
import { ClassValidationPipe } from '../pipe/ClassValidation.pipe';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('userLogin')
  userLogin() {
    return this.userService.userLogin();
  }

  @Post('createUser.do')
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({type:CreateUserDto})
  // @UsePipes(new JoiValidationPipe(creatUserSchema))
  // create(@Body() createUserDto: CreateUserDto) {
  create(@Body(new ClassValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('findAllUser.do')
  @ApiOperation({ summary: '查找全部用户', description: '查找全部用户' })
  @ApiQuery({ name: 'keyWord', required: false })
  findAll(@Query() query: { keyWord: string, pageCurrent: number, pageSize: number }) {
    return this.userService.findAll(query);
  }

  // @Bind(Param('id', new ParseIntPipe()))
  @Get('findOneUser.do')
  @ApiOperation({ summary: '根据id查找用户', description: '根据id查找用户' })
  @ApiQuery({ name: 'id', required: true })
  findOne(@Query('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch('updateUser.do')
  @ApiOperation({ summary: '更新用户', description: '更新用户' })
  @ApiBody({type:UpdateUserDto})
  update(@Body() updateUserDto: UpdateUserDto) {
    // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete('deleteUser.do')
  @ApiOperation({ summary: '根据id删除用户', description: '根据id删除用户' })
  @ApiQuery({ name: 'id', required: true })
  remove(@Query('id') id: number) {
    return this.userService.remove(id);
  }
}
