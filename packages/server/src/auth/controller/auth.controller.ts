import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/local/login')
  public async login(@Req() req: LoginDto) {
    return this.authService.login(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/register')
  public async register(@Body() req: RegisterDto) {
    return this.authService.register(req);
  }
}
