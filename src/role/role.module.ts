import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/entities/Role.entity';
import { RoleController } from './role.controller';
import { UserRole } from 'src/entities/UserRole.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role,UserRole])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
