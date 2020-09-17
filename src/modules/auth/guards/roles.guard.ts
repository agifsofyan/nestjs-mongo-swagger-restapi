import { 
  Injectable, 
  ExecutionContext, 
  ForbiddenException, 
  UnauthorizedException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const hasRole = () => user.roles.some((role: any) => roles.includes(role));
    if (!user) {
      throw new UnauthorizedException();
    }

    if(user.role === '' || user.role === undefined){
      throw new UnauthorizedException('role not valid');
    }

    if(roles[0] !== user.role.adminType){
      throw new ForbiddenException(`Forbidden for admin ${user.role.adminType}`);
    }

    return user && user.roles && hasRole();
  }

 }
