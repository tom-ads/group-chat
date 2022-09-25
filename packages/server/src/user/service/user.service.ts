import { generateRandom } from 'src/helpers/generate';
import { UpdateUserDto } from './../dto/update.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  InternalServerErrorException,
  UnprocessableEntityException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.dto';
import { User } from '../entity/user.entity';
import { VerifyDto } from '../dto/verify.dto';
import LogEvent from 'src/common/enum/LogEvent';
import { DateTime } from "luxon";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private mailerService: MailerService,
  ) {}

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }

  public async createUser(details: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: details.email })
      .orWhere('user.username = :username', { username: details.username })
      .getOne();

    if (existingUser) {
      throw new BadRequestException({
        message: 'Username or email already in use!',
      });
    }

    const createdUser = await this.userRepository.save({
      ...details,
      password: await bcrypt.hash(details.password, 10)
    })

    return createdUser
  }

  public async updateUser(user: User, details: UpdateUserDto) {
    await this.userRepository
      .update({ id: user.id }, { ...details })
      .catch(() => {
        this.logger.error({
          action: LogEvent.UPDATE_USER,
          message: `Failed to update user with Id: ${user.id}`,
        });
        throw new InternalServerErrorException();
      });

    return user;
  }
 
  public async sendEmailVerification(user: User) {
    const verificationCode = generateRandom(6);

    await this.userRepository.update({ id: user.id }, { 
      verificationCode 
    }).catch(() => {
      this.logger.error({
        action: LogEvent.SET_VERIFICATION,
        message: `Failed to set verification code for user with Id: ${user.id}`
      })
    })

    // await this.mailerService.sendMail({
    //   to: user.email,
    //   subject: 'Email Verification',
    //   template: './email-verification',
    //   context: {
    //     username: user.username,
    //     verificationCode,
    //   },
    // });
  }

  public async verifyEmail(user: User, details: VerifyDto) {
    if(user.verifiedAt) {
      throw new ConflictException({
        message: 'Account already verified'
      })
    }

    if(user.verificationCode !== details.code) {
      throw new UnprocessableEntityException({
        message: 'Verification code does not match'
      })
    }

    await this.userRepository.update({ id: user.id }, {
      verificationCode: null,
      verifiedAt: DateTime.now(),
    })
  }
}
