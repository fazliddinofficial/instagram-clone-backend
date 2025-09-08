import { mongoID } from '@common';
import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreateCommentInput {
  @Field(() => ID)
  postId: mongoID;

  @Field(() => String)
  description: string;
}
