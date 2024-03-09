import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  //   @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  //   sentMsgs: Message[];
}
export const UserSchema = SchemaFactory.createForClass(User);
