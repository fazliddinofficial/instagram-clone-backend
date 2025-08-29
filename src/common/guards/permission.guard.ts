import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

import { PERMISSIONS } from '../constants/permissions';
import { MessageError } from '../error';
import { config } from '../config';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const action = context.getHandler().name;

    if (PERMISSIONS.whiteList.has(action)) {
      return true;
    }
    const token = req.headers['authorization'].split(' ')[1];
    const secretKey = config.JWT_SECRET_KEY;

    if (!token) {
      throw new MessageError('Token not found!');
    }
    
    jwt.verify(token, secretKey, (err: any) => {
      if (err) {
        throw new BadRequestException('Invalid token');
      }
    });

    const decodedToken = jwt.decode(token) || '';

    if (PERMISSIONS[decodedToken['role']].has(action)) {
      return true;
    }

    throw new MessageError('You have no permission for this operation!');
  }
}
