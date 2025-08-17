import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignUpInput {
  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  nickName: string;
}
