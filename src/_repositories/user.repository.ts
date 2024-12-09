import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomHttpException } from 'src/_commons/constants/http-exception.constants';
import { UserEntity } from 'src/_entities/user.entity';
import { MeRequestDto } from 'src/user/dto/user.request.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  //사용자 이름으로 회원 찾기
  async findByUsername(username: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.findOne({
        where: { username },
        select: ['id', 'username', 'password', 'isActive'],
      });

      return user;
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //회원 생성
  async createUser(username: string, password: string): Promise<void> {
    try {
      await this.insert({
        username,
        password,
      });
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //회원 수정
  async updateUser(id: number, meRequestDto: MeRequestDto): Promise<void> {
    try {
      await this.update(id, meRequestDto);
    } catch (error) {
      throw new HttpException(
        CustomHttpException['DB_SERVER_ERROR'],
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
