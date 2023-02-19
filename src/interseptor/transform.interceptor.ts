import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        console.log(request.url, '正常接口请求');
        let msg = '';
        switch (request.method) {
          case 'GET':
            msg = '成功';
            break;
          case 'Post':
            msg = '成功';
            break;
          case 'PATCH':
            if (data.affected === 1) {
              msg = '更新成功';
            } else {
              msg = '更新失败';
            }
            break;
          case 'DELETE':
            if (data.affected === 1) {
              msg = '删除成功';
            } else {
              msg = '删除失败';
            }
            break;

          default:
            break;
        }
        return {
          data,
          status: 200,
          success: true,
          message: msg,
        };
      }),
    );
  }
}
