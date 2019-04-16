import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {Role, User} from '@todo/common-api';
import {HashService} from '../hash/hash.service';

@Injectable()
export class UserService {


  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>, private readonly hashService: HashService) {
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({username});
  }

  async createUser(user: User) {
    user.roles = [Role.USER];
    user.passwordHash = await this.hashService.getHash(user.password);
    delete user.password;
    const userEntity = this.userRepository.create(user);
    try {
      return await this.userRepository.save(userEntity);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (err /*: WriteError*/) {
      throw new BadRequestException(err);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }


}
