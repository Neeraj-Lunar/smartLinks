import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform<string, ObjectId> {
  transform(value: string): ObjectId {
    if (!isValidObjectId(value)) {
      throw new BadRequestException({
        errors: {
          id: 'The provided value is not a valid MongoDB ObjectId',
        },
      });
    }
    return new ObjectId(value);
  }
}
