import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PostResolver } from './post.resolver';
import { UserModelDef } from './entities/post.entity';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([UserModelDef])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
