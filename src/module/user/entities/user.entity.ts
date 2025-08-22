import { ObjectType, Field } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { USER_ROLES_ENUM } from '@common';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
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

  @Field(() => USER_ROLES_ENUM, { nullable: true })
  @Prop({
    type: String,
    enum: Object.values(USER_ROLES_ENUM),
    default: USER_ROLES_ENUM.user,
  })
  role: string;

  @Field(() => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  privacy: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
