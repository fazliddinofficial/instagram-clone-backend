import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModelDef } from './entities/comment.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { PostModelDef } from '../post/entities/post.entity';

@Module({
  imports: [MongooseModule.forFeature([CommentModelDef, PostModelDef])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
