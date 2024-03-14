import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './users.schema';

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true, default: false })
  isFavourite: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
