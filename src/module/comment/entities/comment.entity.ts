import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

import { mongoID } from '@common';
import { Types } from 'mongoose';
import { User } from 'src/module/user/entities/user.entity';

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

  @Field(() => String)
  @Prop({ type: String, required: true })
  description: string;

  @Field(() => Number, { nullable: true })
  @Prop({ type: Number })
  likes: number;
}
