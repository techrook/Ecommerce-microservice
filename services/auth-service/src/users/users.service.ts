import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    const user = this.repo.create({ email, password: hashedPassword });
    return this.repo.save(user);
  }

  sanitize(user: User) {
    if (!user) return null;
    const { password, ...rest } = user as any;
    return rest as Partial<User>;
  }
}
