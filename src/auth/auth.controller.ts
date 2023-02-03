import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/password.dto';
import { JWTAuthGuard } from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Patch('change-password')
  @UseGuards(JWTAuthGuard)
  changePassword(
    @Request() req: Req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const { userId } = req.user;
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  async profile(@Request() req: Req) {
    const { userId } = req.user;
    return this.usersService.findOne(userId);
  }
}
