import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { UserRole } from 'src/entities/UserRole.entity';
import { User } from 'src/entities/User.entity';
import { Role } from 'src/entities/Role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole,User,Role])],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
