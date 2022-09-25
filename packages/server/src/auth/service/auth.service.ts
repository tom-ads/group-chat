import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import LogEvent from 'src/common/enum/LogEvent';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateCredentials(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByUsername(username);
 
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({
        message: 'Username or password not recognised. Please try again.',
      });
    }

    // TODO: Serialize user, prevent password etc being returned
    return user;
  }

  public async login(user: User) {
    /* 
      Auth guard will handle the user validation part and assign the user
      into the request object. We just need to generate the access token.
    */
    return {
      ...user,
      access_token: this.jwtService.sign({
        sub: user.id,
        username: user.username,
      }),
    };
  }

  public async register(details: RegisterDto): Promise<User> {
    const createdUser = await this.userService.createUser(details);

    if (!createdUser?.id) {
      this.logger.error({
        action: LogEvent.REGISTRATION,
        message: 'Failed to create a new user',
      });
      throw new BadRequestException({
        message:
          'Unable to register you at the moment. Please try again later!',
      });
    }

    await this.userService.sendEmailVerification(createdUser)

    return createdUser
  }
}
