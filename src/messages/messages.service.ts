import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Message } from 'src/schemas/messages.schema';
import { CreateMsgDto } from './dto/create-msg.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async sendMsg(createMsgDto: CreateMsgDto, req) {
    try {
      console.log(createMsgDto);
      const newMsg = await this.messageModel.create({
        ...createMsgDto,
        sender: req.user._id,
      });
      return newMsg;
    } catch (error) {
      throw new BadRequestException('Failed to send message');
    }
  }

  async sendMsgAnon(createMsgDto: CreateMsgDto) {
    try {
      const newMsg = await this.messageModel.create({
        ...createMsgDto,
        sender: null,
      });
      return newMsg;
    } catch (error) {
      throw new BadRequestException('Failed to send anonymous message');
    }
  }

  async getMsgById(id: string, req: any) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestException('Invalid Id');
      }
      const msg = await this.messageModel.findOne({
        _id: id,
        recipient: req.user.username,
      });
      if (!msg) {
        throw new NotFoundException('No msg found with this id');
      }
      return msg;
    } catch (error) {
      throw new NotFoundException('Message not found');
    }
  }
}
