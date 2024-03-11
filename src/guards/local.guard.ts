import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  private readonly logger = new Logger(LocalGuard.name);

  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(LocalGuard.name);
    this.logger.log('BEFORE');
    const result = (await super.canActivate(context)) as boolean;
    this.logger.log('AFTER');
    await super.logIn(context.switchToHttp().getRequest()); //creating a cookie with the sessionID
    return result;
  }
}
