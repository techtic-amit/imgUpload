import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService as config } from './common/config.service';
import { AuthModule } from './modules/auth/auth.module';
import ormconfig from './ormconfig';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    SharedModule.forRoot(),
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config],
      useFactory: async (configService: config) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: config.get('MAIL_SECURE'),
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          forceEmbeddedImages: config.get('MAIL_EMBEDDED_IMAGES'),
          from: `${config.get('APP_NAME')} <${config.get('MAIL_FROM_EMAIL')}>`,
        },
        template: {
          dir: process.cwd() + '/views/email-templates',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController,],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
