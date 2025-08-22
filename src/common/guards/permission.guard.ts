import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { PERMISSIONS } from '../constants/permissions';
import { MessageError } from '../error';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext().req;
    const userRole = ctx.user;
    const action = context.getHandler().name;

    if (PERMISSIONS.whiteList.has(action)) {
      return true;
    }
    if (PERMISSIONS[userRole].has(action)) {
      return true;
    }
    throw new MessageError('You have no permission for this operation!');
  }
}
