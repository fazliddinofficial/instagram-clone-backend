import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CONTROLLERS_NAMES, mongoID } from '@common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  [CONTROLLERS_NAMES.createPost](
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Post)
  [CONTROLLERS_NAMES.updatePostById](
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  [CONTROLLERS_NAMES.deletePostById](@Args('postId') postId: mongoID) {
    return this.postService.delete(postId);
  }

  @Query(() => Post)
  [CONTROLLERS_NAMES.getPostsById](@Args('postId') postId: mongoID) {
    return this.postService.getDocumentById(postId);
  }

  @Query(() => [Post])
  [CONTROLLERS_NAMES.getAllPosts]() {
    return this.postService.getAllDocuments();
  }
}
