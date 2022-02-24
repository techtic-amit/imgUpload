import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private configService: any;

  constructor(private readonly mailerService: MailerService) {
    this.configService = new ConfigService();
  }
  public async userForgotPassword(data: any = {}): Promise<any> {
    data = Object.assign({}, data, this.configService);
    const url = 'reset-password/' + data.context.token;
    data.context.reset_password_url = this.baseUrl(url);
    console.log(data.context);
    return this.mailerService.sendMail({
      to: data.to, //List of receivers
      subject: 'Forgot Password - ' + this.configService.get('APP_NAME'), //Subject line
      template: 'user-forgot-password',
      context: {
        settings: { APP_NAME: this.configService.get('EMAIL_APP_NAME') },
        data: data.context,

        year: new Date().getFullYear(),
      },
    });
  }

  public baseUrl(path?: string) {
    let app_url = this.configService.get('FRONTEND_URL');
    if (path) {
      app_url += `/${path}`;
    }
    return app_url;
  }
}
