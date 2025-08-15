import { mongoID } from '@common';
import { CreateUserInput } from './create-user.input';
import {
  InputType,
  Field,
  Int,
  PartialType,
  ArgsType,
  ID,
} from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: mongoID;
}
