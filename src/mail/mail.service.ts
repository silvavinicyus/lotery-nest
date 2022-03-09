import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BetModel } from 'src/bets/bets.model';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailNewUser(user: UserModel) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to LoteryNest',
      html: `<h1>Hey ${user.name} </h1> <p>Welcome to our lotery site!</p> <p> We Hope you enjoy your time around here </p>`,
    });
  }

  async sendNewBetMail({ numbers, user, value, game }: INewBetEmail) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Thank you for your bet!',
      html: `<h1>Hey ${
        user.name
      } </h1> <p>Thank you for your bet of R$ ${value.toLocaleString('pt-br', {
        minimumFractionDigits: 2,
      })} !</p> <p> Here is the numbers and game that you choosed:<br><br>Numbers: ${numbers}<br><br>Game: ${game}</p>`,
    });
  }
}

interface INewBetEmail {
  numbers: string;
  user: UserModel;
  value: number;
  game: string;
}
