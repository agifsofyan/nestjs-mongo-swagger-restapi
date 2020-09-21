import { 
  Injectable, 
  ExecutionContext, 
  ForbiddenException, 
  UnauthorizedException,
  CanActivate,
  Inject,
  forwardRef
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, info: Error, context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }

    if(!user) {
      throw new UnauthorizedException();
    }

    // console.log('user', user)
    // console.log('roles', roles)

    const userRole = user.role.map(r => r.adminType)

    const hasRole = () => userRole.some((role: any) => roles.includes(role));
    if (!hasRole) {
      throw new UnauthorizedException();
    }

    if (!(user.role && hasRole())) {
       throw new ForbiddenException('Forbidden');
    }

    return user && userRole && hasRole();
  }

 }
