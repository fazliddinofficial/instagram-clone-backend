import { ObjectType, Field } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class User {
  @Field()
  _id: string;

  @Field(() => String)
  @Prop({ type: String })
  fullName: string;

  @Field(() => String)
  @Prop({ type: String })
  email: string;

  @Field(() => String)
  @Prop({ type: String })
  password: string;

  @Field(() => String)
  @Prop({ type: String })
  nickName: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description: string;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  stories: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  savedStories: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  posts: string[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String] })
  followers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
