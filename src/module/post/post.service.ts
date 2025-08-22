import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';
import { BaseService } from '@common';

@Injectable()
export class PostService extends BaseService<
  CreatePostInput,
  UpdatePostInput,
  Post
> {
  constructor(
    @InjectModel(Post.name) private readonly PostSchema: Model<Post>,
  ) {
    super(PostSchema);
  }
}
