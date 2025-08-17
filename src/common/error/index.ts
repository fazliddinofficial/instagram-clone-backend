import { HttpException, HttpStatus } from '@nestjs/common';

export class DataNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Data not found!', HttpStatus.NOT_FOUND);
  }
}

export class UniquenessError extends HttpException {
  constructor(value: string) {
    super(`${value} is already exist!`, HttpStatus.BAD_REQUEST);
  }
}
