import { ObjectType, Field } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field()
  _id: string;

  @Field((type) => String)
  @Prop({ type: String })
  fullName: string;

  @Field((type) => String)
  @Prop({ type: String })
  email: string;

  @Field((type) => String)
  @Prop({ type: String })
  password: string;

  @Field((type) => String)
  @Prop({ type: String })
  nickName: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  description: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  image: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  story: string;

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [String] })
  savedStories: string[];

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [String] })
  posts: string[];

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [String] })
  followers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
