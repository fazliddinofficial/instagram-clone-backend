import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostModelDef } from './entities/post.entity';
import { UserModel } from '../user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([PostModelDef, UserModel])],
  providers: [PostResolver, PostService],
})
export class PostModule {}
