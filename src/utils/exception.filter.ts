import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.FORBIDDEN;

    let errorResponse: any = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        errorResponse.message = res;
      } else if (typeof res === 'object' && res !== null) {
        errorResponse = res;
      }
    }

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : errorResponse.message || 'Unexpected error';

    this.logger.error(`Exception caught: ${exception instanceof Error ? exception.stack: JSON.stringify(exception)}`);
    response.status(status).json({
      status: false,
      statusCode: status,
      message: message,
      error: {
        code: status,
        details: message,
      },
      timestamp: new Date().toISOString(),
    });
  }
}
