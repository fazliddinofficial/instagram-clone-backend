import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModelDef } from './entities/comment.entity';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [MongooseModule.forFeature([CommentModelDef])],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
