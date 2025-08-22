import { mongoID } from '@common';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/module/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: mongoID;

  @Field(() => ID, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'File' })
  fileId: mongoID;

  @Field(() => String)
  @Prop({ type: String })
  description: string;

  @Field(() => [ID], { nullable: true })
  @Prop({ type: [Types.ObjectId] })
  likes: mongoID[];

  @Field(() => [ID], { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  comments: mongoID[];

  @Field(() => [String])
  @Prop({ type: [String] })
  hashtags: string[];
}

export const UserModel = SchemaFactory.createForClass(Post);

export const UserModelDef: ModelDefinition = {
  name: Post.name,
  schema: UserModel,
};
