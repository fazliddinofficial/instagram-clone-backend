import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  nickName: string;

  @Field((type) => String, { nullable: true })
  description: string;

  @Field((type) => String, { nullable: true })
  image: string;

  @Field((type) => String, { nullable: true })
  story: string;

  @Field((type) => [String], { nullable: true })
  savedStories: string[];

  @Field((type) => [String], { nullable: true })
  posts: string[];

  @Field((type) => [String], { nullable: true })
  followers: string[];
}
