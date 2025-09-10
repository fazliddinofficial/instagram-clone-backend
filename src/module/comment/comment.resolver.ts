import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { CONTROLLERS_NAMES, IUser, mongoID, UseAllGuards } from '@common';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}
  @Mutation(() => Comment)
  @UseAllGuards()
  [CONTROLLERS_NAMES.createComment](
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() req: any,
  ) {
    const currentUser: IUser = req.user.args;
    return this.commentService.createComment(
      createCommentInput,
      currentUser.userId,
    );
  }

  @Mutation(() => Comment)
  [CONTROLLERS_NAMES.updateCommentById](
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.updateCommentById(updateCommentInput);
  }

  @Mutation(() => String)
  [CONTROLLERS_NAMES.deleteCommentById](
    @Args('commentId', { type: () => ID }) commentId: mongoID,
  ) {
    return this.commentService.deleteCommentById(commentId);
  }

  @Query(() => [Comment])
  [CONTROLLERS_NAMES.getAllComments](
    @Args('postId', { type: () => ID }) postId: mongoID,
  ) {
    return this.commentService.getAllComments(postId);
  }
}
