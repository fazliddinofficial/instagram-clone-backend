import { ID } from '@common';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: ID;
}
