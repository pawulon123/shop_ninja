import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mailer.service';
import mailerconfig = require('./mailer.config')
import {ProductModule} from '../product/product.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    ProductModule,
    UserModule,
    MailerModule.forRoot(mailerconfig)
  ],
  providers: [MailService],
  exports: [
    MailService
  ]
})
export class MailModule { }
