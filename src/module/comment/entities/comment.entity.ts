import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { mongoID } from '@common';
import { Types } from 'mongoose';
import { User } from 'src/module/user/entities/user.entity';
import { Post } from 'src/module/post/entities/post.entity';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Field(() => ID)
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId: mongoID;

  @Field(() => ID)
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: Post.name,
  })
  postId: mongoID;

  @Field(() => String)
  @Prop({ type: String, required: true })
  description: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number })
  likes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Post);

export const CommentModelDef: ModelDefinition = {
  name: Comment.name,
  schema: CommentSchema,
};
