import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(NotFoundException, BadRequestException, InternalServerErrorException, Prisma.PrismaClientKnownRequestError)
export class ProjectExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const _ctx = host.switchToHttp();
    const _response = _ctx.getResponse();
    const _status = this.getHttpStatus(exception);

    _response.status(_status).json({
      statusCode: _status,
      message: exception.message || 'Internal server error',
    });
  }

  private getHttpStatus(exception: Error): number {
    if (exception instanceof NotFoundException) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof BadRequestException) {
      return HttpStatus.BAD_REQUEST;
    }
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      return HttpStatus.BAD_REQUEST; // Customize status for Prisma errors
    }
    // Handle other specific exceptions if needed

    return HttpStatus.INTERNAL_SERVER_ERROR; // Default to internal server error status
  }
}
