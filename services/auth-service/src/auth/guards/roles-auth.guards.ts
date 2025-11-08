import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const role = (req.session as any)?.role;
    if (!role || !this.allowedRoles.includes(role)) throw new ForbiddenException();
    return true;
  }
}
