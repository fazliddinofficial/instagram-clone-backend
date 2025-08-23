import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { HydratedDocument, Model } from 'mongoose';
import { BaseService, DataNotFoundException } from '@common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService extends BaseService<
  CreatePostInput,
  UpdatePostInput,
  Post
> {
  constructor(
    @InjectModel(Post.name) private readonly PostSchema: Model<Post>,
    @InjectModel(User.name) private readonly UserSchema: Model<User>,
  ) {
    super(PostSchema);
  }

  async createPost({
    fileId,
    hashtags,
    userId,
    description,
  }: CreatePostInput): Promise<HydratedDocument<Post>> {
    const createdPost = await this.create({
      fileId,
      hashtags,
      userId,
      description,
    });

    try {
      const foundUser = await this.UserSchema.findByIdAndUpdate(
        userId,
        {
          $push: { posts: createdPost._id },
        },
        { new: true },
      );

      if (!foundUser) {
        throw new DataNotFoundException('User not found!');
      }

      return createdPost;
    } catch (error) {
      await this.PostSchema.findByIdAndDelete(createdPost._id);
      throw new BadRequestException('Error while creating post!');
    }
  }
}
