import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { SessionSerializer } from 'src/sessions.serializer';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [AuthService, SessionSerializer, LocalStrategy],
  controllers: [AuthController],
  imports: [UsersModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
