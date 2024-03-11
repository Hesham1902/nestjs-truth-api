import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/messages.schema';
import { CreateMsgDto } from './dto/create-msg.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async sendMsg(createMsgDto: CreateMsgDto, req) {
    console.log(createMsgDto);
    const newMsg = await this.messageModel.create({
      ...createMsgDto,
      sender: req.user._id,
    });
    return newMsg;
  }

  async sendMsgAnon(createMsgDto: CreateMsgDto) {
    const newMsg = await this.messageModel.create({
      ...createMsgDto,
      sender: null,
    });
    return newMsg;
  }
}
