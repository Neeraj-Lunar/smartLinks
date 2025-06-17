import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SuccessResponse } from './interface/success-response.interface';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    if (request.url === '/') {
      return next.handle();
    }

    return next.handle().pipe(
      map((res: SuccessResponse) => this.responseHandler(res, context)),
      catchError((err: HttpException) => {
        this.errorHandler(err, context);
        return throwError(() => err);
      }),
    );
  }

  private async responseHandler(res: SuccessResponse, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;
    const rawResponse = await res;
    return {
      status: 'success',
      statusCode,
      message: rawResponse?.message,
      data: rawResponse?.result,
      timestamp: new Date().toISOString(),
    };
  }

  private errorHandler(exception: unknown, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
  
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let stack: string | undefined;
    let errorDetails: any = null;
  
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object' && responseBody !== null) {
        message = (responseBody as any).message || exception.message;
        errorDetails = (responseBody as any).errors || null;
      } else {
        message = exception.message;
      }
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }
  
    this.logger.error(`Error: ${message}, Status: ${status}`, stack);
    const errorCode = this.getErrorCode(status);
    response.status(status).json({
      status: 'error',
      statusCode: status,
      message,
      error: {
        code: errorCode,
        details: errorDetails,
      },
      timestamp: new Date().toISOString(),
    });
  }

  private getErrorCode(status: number): string {
    const errorMap = {
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHORIZED',
      [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL_SERVER_ERROR',
      [HttpStatus.CONFLICT]: 'CONFLICT',
      [HttpStatus.GATEWAY_TIMEOUT]: 'GATEWAY_TIMEOUT',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'UNPROCESSABLE_ENTITY',
      [HttpStatus.EXPECTATION_FAILED]: 'EXPECTATION_FAILED',
      [HttpStatus.PRECONDITION_REQUIRED]: 'PRECONDITION_REQUIRED',
    };
    return errorMap[status] || 'UNKNOWN_ERROR';
  }
}
