import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqStartTime = Date.now();
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${req.method} ${req.url} ${Date.now() - reqStartTime}ms`,
          context.getClass().name,
        );
      }),
      catchError((err): Observable<any> => {
        Logger.error(
          `${req.method} ${req.url} ${
            Date.now() - reqStartTime
          }ms Error Message: ${err?.message}`,
          context.getClass().name,
        );
        return throwError(() => err);
      }),
    );
  }
}
