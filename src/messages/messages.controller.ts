import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMsgDto } from './dto/create-msg.dto';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/sendanon')
  sendAnon(@Body() body: CreateMsgDto) {
    return this.messageService.sendMsgAnon(body);
  }

  @Post('/sendMsg')
  sendKnown(@Body() body: CreateMsgDto, @Request() req) {
    return this.messageService.sendMsg(body, req);
  }
}
