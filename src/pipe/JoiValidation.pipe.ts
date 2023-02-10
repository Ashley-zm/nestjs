import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log("管道验证",metadata);
    const { error } = this.schema.validate(value);
    console.log("管道验证error",error.message);
    if (error) {
      throw new BadRequestException('Validation failed-' + error);
    }
    return value;
  }
}
