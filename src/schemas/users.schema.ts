import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { Message } from './messages.schema';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  sentMsgs: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);

//Middlewares
UserSchema.pre('save', async function () {
  const hashedPassword = await hash(this.password, 12);
  this.password = hashedPassword;
});
