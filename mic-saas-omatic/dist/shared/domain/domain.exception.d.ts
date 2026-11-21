export declare class DomainError extends Error {
    constructor(message: string);
}
export declare class EntityNotFoundError extends DomainError {
    constructor(entityName: string, id: string);
}
export declare class ConflictError extends DomainError {
    constructor(message: string);
}
