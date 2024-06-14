export class ValidationError extends Error {
    constructor(message: string, public data?: any) {
        super(message);
        this.name = 'ValidationError';
    }
}