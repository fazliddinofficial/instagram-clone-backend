import { mongoID } from '@common';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/module/user/entities/user.entity';

@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Field(() => ID)
  id: mongoID;

  @Field(() => ID)
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoID;

  @Field(() => ID)
  @Prop({
    type: Types.ObjectId,
    ref: 'File',
    required: true,
  })
  fileId: mongoID;

  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  description: string;

  @Field(() => [ID], { nullable: true })
  @Prop({ type: [Types.ObjectId] })
  likes: mongoID[];

  @Field(() => [ID], { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  comments: mongoID[];

  @Field(() => String)
  @Prop({ type: String })
  hashtags: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number, default: 0 })
  viewed: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);

export const PostModelDef: ModelDefinition = {
  name: Post.name,
  schema: PostSchema,
};
