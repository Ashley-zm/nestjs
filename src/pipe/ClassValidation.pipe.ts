import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    console.log(object);

    const errors = await validate(object);
    if (errors.length > 0) {
      // 取出错误原因
      const err = errors.map((item) => {
        console.log(item.constraints);
        return item.constraints.isNotEmpty;
      });
      // throw new BadRequestException(err);
      throw new BadRequestException('validation failed——' + err.join(','));
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
