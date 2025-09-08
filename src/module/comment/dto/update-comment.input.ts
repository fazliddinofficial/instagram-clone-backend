import { ArgsType, Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateCommentInput } from './create-comment.input';
import { mongoID } from '@common';

@InputType()
@ArgsType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  @Field(() => ID)
  commentId: mongoID;
}
