import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreateUserInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  nickName: string;
}
