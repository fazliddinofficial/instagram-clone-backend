import { Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {}
