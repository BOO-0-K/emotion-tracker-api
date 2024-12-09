import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getError(): string {
    throw new HttpException(
      '❌ 500 server error test!!!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
