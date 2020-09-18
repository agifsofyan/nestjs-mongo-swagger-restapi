import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { AuthModule } from '../auth/auth.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleSchema } from './schema/role.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
		// AuthModule
	],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
