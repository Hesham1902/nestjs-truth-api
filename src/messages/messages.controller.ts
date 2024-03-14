import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMsgDto } from './dto/create-msg.dto';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/sendAnon')
  sendAnon(@Body() body: CreateMsgDto) {
    return this.messageService.sendMsgAnon(body);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/sendMsg')
  sendMsg(@Body() body: CreateMsgDto, @Request() req) {
    return this.messageService.sendMsg(body, req);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  getMsgById(@Param('id') id, @Request() req) {
    return this.messageService.getMsgById(id, req);
  }
}
