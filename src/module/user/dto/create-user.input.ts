import { InputType, Int, Field, ArgsType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class CreateUserInput {
  @Field((type) => String)
  fullName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  nickName: string;
}
