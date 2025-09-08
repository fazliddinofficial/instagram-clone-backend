import { mongoID } from '@common';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, ID, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => ID)
  id: mongoID;
}
