import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword: password } = changePasswordDto;
    const currentPassword = await this.userRepository.getPassword(userId);

    if (currentPassword !== oldPassword) {
      throw new BadRequestException('Incorrect password');
    }

    await this.userRepository.update(userId, { password });
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
      }),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
