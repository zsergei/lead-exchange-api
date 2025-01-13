import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(userData: any) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(user: any) {
    return this.userRepository.save(user);
  }

  async generateResetToken(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const token = this.jwtService.sign({ email }, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await this.userRepository.save(user);
    return token;
  }

  async validateResetToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { resetToken: token },
      });
      if (!user || user.resetTokenExpires < new Date())
        throw new Error('Invalid or expired token');
      return user;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;

    await this.userRepository.save(user);
  }
}
