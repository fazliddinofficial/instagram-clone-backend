import { MiddlewareContext, NextFn } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

export const loggerMiddleWare = async (ctx: MiddlewareContext, next: NextFn) => {
  const req = ctx.context.req;
  const info = ctx.info as GraphQLResolveInfo;
  if (!req.logged) {
    req.logged = true;
    const authHeader = req.headers.authorization;
    const info = ctx.info.path.prev?.key;
  }
  return await next();
};
