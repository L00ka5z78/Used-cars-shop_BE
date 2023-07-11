import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //run sth before request is handled
    console.log('Running before handler', context);
    return handler.handle().pipe(
      map((data: any) => {
        //run sth before response is sent out
        console.log('IM running before response is sent out');
      }),
    );
  }
}
