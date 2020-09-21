import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AgentController } from './agent.controller';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { RoleSchema } from '../role/schema/role.schema';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Role', schema: RoleSchema }
    ]),
    RoleModule
  ],
  controllers: [AgentController],
  providers: [UserService, RoleService]
})
export class AgentModule {}
