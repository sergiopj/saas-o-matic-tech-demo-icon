import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class ProblemDetailExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
