import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mailer.service';
import mailerconfig = require('./mailer.config')
@Module({
  imports: [
    MailerModule.forRoot(mailerconfig)
  ],
  providers: [MailService],
  exports: [
    MailService
  ]
})
export class MailModule { }
