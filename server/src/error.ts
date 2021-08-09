import { ErrorCode } from './enum/error-code.enum';

export class ErrorDefault extends Error {
    constructor(public readonly code: ErrorCode = ErrorCode.UNHANDLED, public readonly data?: unknown) {
        super('');
    }
}
