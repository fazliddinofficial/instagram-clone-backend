import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

import {
  BaseService,
  DataNotFoundException,
  MessageError,
  mongoID,
} from '@common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
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

  async createPost(
    { fileId, hashtags, description }: CreatePostInput,
    userId: mongoID,
  ): Promise<HydratedDocument<Post>> {
    const createdPost = await this.PostSchema.create({
      fileId,
      hashtags,
      description,
      userId,
    });

    try {
      const foundUser = await this.UserSchema.findById(userId);

      if (!foundUser) {
        throw new DataNotFoundException('User not found!');
      }

      foundUser.posts.push(createdPost._id);

      foundUser.save();

      return createdPost;
    } catch (error) {
      await this.PostSchema.findByIdAndDelete(createdPost._id);
      throw new BadRequestException('Error while creating post!');
    }
  }

  async updatePostById(data: UpdatePostInput): Promise<HydratedDocument<Post>> {
    return await this.update(data.id, data);
  }

  async deletePostById(
    id: mongoID,
    userId: mongoID,
  ): Promise<HydratedDocument<Post>> {
    const deletedPost = await this.delete(id);

    if (!deletedPost) {
      throw new BadRequestException('Post has not been deleted!');
    }
    const foundUser = await this.UserSchema.findById(userId);

    const postIndex = foundUser?.posts.indexOf(deletedPost._id);

    if (!postIndex) {
      throw new MessageError('Post not found!');
    }
    foundUser?.posts.splice(postIndex, 1);

    foundUser?.save();

    return deletedPost;
  }
}
