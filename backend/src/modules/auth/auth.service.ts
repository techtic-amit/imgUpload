// import {
//   BadRequestException,
//   forwardRef,
//   Inject,
//   Injectable
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import * as crypto from 'crypto';
// import { Users } from 'src/modules/entity/users.entity';
// import { EmailService } from 'src/shared/services/email/email.service';
// import { Repository } from 'typeorm';
// import { LoginDTO } from '../../shared/dto/login.dto';
// const randomize = require('randomatic');
// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     @InjectRepository(Users)
//     private readonly userRepository: Repository<Users>,
//     @Inject(forwardRef(() => EmailService))
//     private readonly emailService: EmailService,
//   ) { }

//   async createOrUpdateUser(payload: any) {
//     try {
//       const User = new Users();
//       if (payload.name) {
//         User.name = payload.name;
//       }

//       if (payload.email) {
//         User.email = payload.email;
//       }
//       if (payload.password && !payload.id) {
//         User.password = payload.password;
//       }

//       if (payload.role_id) {
//         User.role_id = payload.role_id;
//       }
//       let finalUser;
//       if (payload.id) {
//         await this.userRepository.update(User, payload.id);
//         finalUser = await this.userRepository.find({ id: payload.id });
//       } else {
//         const data = await this.userRepository.save(User);
//         finalUser = await this.userRepository.find({ id: data.id });
//       }
//       return finalUser;
//     } catch (error) {
//       throw error;
//     }
//   }
//   async sendForgotPasswordEmail(payload): Promise<any> {
//     const email = payload.email;
//     const user = await this.findOne({ email: email });
//     if (!user) {
//       throw new Error('Sorry this user does not exist');
//     }
//     const token = this.createToken(user);

//     const context: any = await this.findOne({ email: email });
//     context.token = token.token;
//     let response_message = '';
//     this.emailService
//       .userForgotPassword({ to: email, context: context })
//       .then()
//       .catch((error) => {
//         throw new BadRequestException(error);
//       });
//     response_message = 'Reset password link sent on your email account';

//     return response_message;
//   }

//   async validateUser(payload: LoginDTO): Promise<any> {
//     const passHash = crypto
//       .createHmac('sha256', payload.password)
//       .digest('hex');
//     const verify = await this.userRepository
//       .createQueryBuilder('users')
//       .where('users.email = :emailId AND users.password = :pass', {
//         emailId: payload.email,
//         pass: passHash,
//       })
//       .getOne();

//     if (verify == undefined) {
//       return verify;
//     }
//     //await this.userService.checkVerification(verify);

//     //let data = await this.userService.findOne({ id: verify.id }, ['roles']);
//     const data = await this.userRepository
//       .createQueryBuilder('users')
//       .where('users.id =:id', { id: verify.id })

//       .getOne();

//     return data;
//   }

//   createToken(user: Users) {
//     const payload = { email: user.email, id: user.id };
//     return {
//       token: this.jwtService.sign(payload),
//     };
//   }
//   async findOne(where: Object, relations: Array<any> = []): Promise<Users> {
//     return this.userRepository.findOne({ where: where, relations: relations });
//   }
// }
