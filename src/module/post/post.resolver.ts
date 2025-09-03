import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  CONTROLLERS_NAMES,
  GqlAuthGuard,
  IUser,
  mongoID,
  RolesGuard,
  UseAllGuards,
} from '@common';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  @UseAllGuards()
  [CONTROLLERS_NAMES.createPost](
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() req: any,
  ) {
    const user: IUser = req.user.args;
    return this.postService.createPost(createPostInput, user.userId);
  }

  @UseAllGuards()
  @Mutation(() => Post)
  [CONTROLLERS_NAMES.updatePostById](
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.updatePostById(updatePostInput);
  }

  @Mutation(() => Post)
  @UseAllGuards()
  [CONTROLLERS_NAMES.deletePostById](
    @Args('postId', { type: () => ID }) postId: mongoID,
    @CurrentUser() req: any,
  ) {
    const user: IUser = req.user.args;
    return this.postService.deletePostById(postId, user.userId);
  }

  @Query(() => Post)
  @UseAllGuards()
  [CONTROLLERS_NAMES.getPostsById](
    @Args('postId', { type: () => ID }) postId: mongoID,
  ) {
    return this.postService.getDocumentById(postId);
  }

  @Query(() => [Post])
  @UseAllGuards()
  [CONTROLLERS_NAMES.getAllPosts]() {
    return this.postService.getAllDocuments();
  }
}
