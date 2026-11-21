"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemDetailExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const domain_exception_1 = require("../../domain/domain.exception");
let ProblemDetailExceptionFilter = class ProblemDetailExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const problem = resolveProblemDetail(exception);
        response
            .status(problem.status)
            .header('Content-Type', 'application/problem+json')
            .json({
            type: `https://errors.saas-o-matic.com/${problem.status}`,
            title: problem.title,
            status: problem.status,
            detail: problem.detail,
            instance: request.url,
            ...(problem.invalidParams ? { invalidParams: problem.invalidParams } : {}),
            timestamp: new Date().toISOString(),
        });
    }
};
exports.ProblemDetailExceptionFilter = ProblemDetailExceptionFilter;
exports.ProblemDetailExceptionFilter = ProblemDetailExceptionFilter = __decorate([
    (0, common_1.Catch)()
], ProblemDetailExceptionFilter);
function resolveProblemDetail(exception) {
    if (exception instanceof domain_exception_1.EntityNotFoundError) {
        return {
            status: common_1.HttpStatus.NOT_FOUND,
            title: 'Not Found',
            detail: exception.message,
        };
    }
    if (exception instanceof domain_exception_1.ConflictError) {
        return {
            status: common_1.HttpStatus.CONFLICT,
            title: 'Conflict',
            detail: exception.message,
        };
    }
    if (exception instanceof domain_exception_1.DomainError) {
        return {
            status: common_1.HttpStatus.BAD_REQUEST,
            title: 'Bad Request',
            detail: exception.message,
        };
    }
    if (exception instanceof common_1.HttpException) {
        return parseHttpException(exception);
    }
    return handleUnexpectedError(exception);
}
function parseHttpException(exception) {
    const status = exception.getStatus();
    const response = exception.getResponse();
    if (typeof response === 'string') {
        return {
            status,
            title: exception.name,
            detail: response,
        };
    }
    if (typeof response === 'object' && response !== null) {
        const payload = response;
        const title = payload.error || exception.name;
        if (Array.isArray(payload.message)) {
            return {
                status,
                title,
                detail: 'Validation failed for one or more fields.',
                invalidParams: extractInvalidParams(payload.message),
            };
        }
        return {
            status,
            title,
            detail: payload.message || exception.message,
        };
    }
    return {
        status,
        title: exception.name,
        detail: exception.message,
    };
}
function extractInvalidParams(messages) {
    return messages.map((msg) => {
        const text = String(msg);
        return {
            name: text.split(' ')[0] || 'field',
            reason: text,
        };
    });
}
function handleUnexpectedError(exception) {
    console.error('Unhandled internal server error:', exception);
    return {
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        title: 'Internal Server Error',
        detail: 'An unexpected internal error occurred. Please try again shortly or contact support.',
    };
}
//# sourceMappingURL=problem-detail-exception.filter.js.map