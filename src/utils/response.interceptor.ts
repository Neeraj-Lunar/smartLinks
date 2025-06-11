import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError, of } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    // Skip root URL if needed
    if (request.url === '/') {
      return next.handle();
    }

    return next.handle().pipe(
      map((res: any) => this.responseHandler(res, context)),
      catchError((error) => {
        // Only handle known HttpExceptions here
        if (error instanceof HttpException) {
          return of(this.formatError(error));
        }

        // Unknown error? Let global filter catch it
        return throwError(() => error);
      }),
    );
  }

  private responseHandler(res: any, context: ExecutionContext) {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return {
      status: true,
      statusCode,
      message: res?.message || 'Success',
      result: res.result,
      ...(res?.totalPages !== undefined && { totalPages: res.totalPages }),
      timestamp: new Date().toISOString(),
    };
  }

  private formatError(exception: HttpException) {
    const status = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.getResponse?.()['message'] || exception.message || 'Error occurred';
    const code = this.getErrorCode(status);

    this.logger.error(`Handled error: ${JSON.stringify(message, null, 2)}`);

    return {
      status: false,
      statusCode: status,
      message,
      error: {
        code,
        details: message,
      },
      timestamp: new Date().toISOString(),
    };
  }

  private getErrorCode(status: number): string {
    const errorMap = {
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
      [HttpStatus.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
    };
    return errorMap[status] || 'UNKNOWN_ERROR';
  }
}
