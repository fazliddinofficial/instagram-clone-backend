import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './entities/comment.entity';
import { HydratedDocument, Model } from 'mongoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { MessageError, mongoID } from '@common';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly CommentSchema: Model<Comment>,
  ) {}

  async createComment(
    createCommentInput: CreateCommentInput,
    userId: mongoID,
  ): Promise<HydratedDocument<Comment>> {
    return await this.CommentSchema.create({ ...createCommentInput, userId });
  }

  async updateCommentById({
    commentId,
    ...data
  }: UpdateCommentInput): Promise<HydratedDocument<Comment>> {
    const foundComment = await this.CommentSchema.findByIdAndUpdate(
      commentId,
      { ...data },
      { new: true },
    );

    if (!foundComment) {
      throw new MessageError('Comment not found');
    }

    return foundComment;
  }

  async deleteCommentById(commentId: mongoID): Promise<String> {
    const deletedComment =
      await this.CommentSchema.findByIdAndDelete(commentId);

    if (!deletedComment) {
      throw new MessageError('Comment not found!');
    }

    return 'Comment deleted!';
  }

  async getAllComments(
    postId: mongoID,
  ): Promise<Array<HydratedDocument<Comment>>> {
    return await this.CommentSchema.find({ postId });
  }
}
