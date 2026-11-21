"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.EntityNotFoundError = exports.DomainError = void 0;
class DomainError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DomainError = DomainError;
class EntityNotFoundError extends DomainError {
    constructor(entityName, id) {
        super(`${entityName} with id '${id}' was not found.`);
        this.name = 'EntityNotFoundError';
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
class ConflictError extends DomainError {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;
//# sourceMappingURL=domain.exception.js.map