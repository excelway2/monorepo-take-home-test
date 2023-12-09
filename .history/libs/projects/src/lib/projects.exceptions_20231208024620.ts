import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(NotFoundException, BadRequestException, InternalServerErrorException, Prisma.PrismaClientKnownRequestError)
export class ProjectExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    // Retrieve http context and response
    const _ctx = host.switchToHttp();
    const _response = _ctx.getResponse();

    // Get the appropriate http status code based on the exception
    const _status = this.getHttpStatus(exception);

    // Send response with appropriate status code and message
    _response.status(_status).json({
      statusCode: _status,
      message: exception.message || 'Internal server error',
    });
  }

  private getHttpStatus(exception: Error): number {
    // Map exceptions to http status codes
    if (exception instanceof NotFoundException) {
      return HttpStatus.NOT_FOUND; // Status code for Not Found 404
    }
    if (exception instanceof BadRequestException) {
      return HttpStatus.BAD_REQUEST; // Status code for Bad Request 400
    }
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return HttpStatus.BAD_REQUEST; // Customize status for Prisma errors
    }

    return HttpStatus.INTERNAL_SERVER_ERROR; // Default to internal server error status (500)
  }
}
