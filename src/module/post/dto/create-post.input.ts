import { mongoID } from '@common';
import { InputType, Int, Field, ID, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreatePostInput {
  @Field(() => ID)
  userId: mongoID;

  @Field(() => ID)
  fileId: mongoID;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  hashtag: String;
}
