import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
@Module({
  imports: [

    ConfigModule.forRoot(),/*?*/
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3200s' },
    }),
  ],
  exports: [
    AuthService,
    JwtModule
  ],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,

  ]
})
export class AuthModule { }
