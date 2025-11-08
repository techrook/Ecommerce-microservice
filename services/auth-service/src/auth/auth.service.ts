import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;

  constructor(private readonly users: UserService) {}

  async register(email: string, password: string) {
    const existing = await this.users.findByEmail(email);
    if (existing) throw new BadRequestException('Email already in use');

    const hashed = await bcrypt.hash(password, this.SALT_ROUNDS);
    const user = await this.users.create(email, hashed);
    return this.users.sanitize(user);
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  // returns sanitized user object
  async login(email: string, password: string) {
    const user = await this.validateCredentials(email, password);
    return this.users.sanitize(user);
  }
}
