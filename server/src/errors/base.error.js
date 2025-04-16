export class BaseException extends Error{
    constructor(message,statusCode) {
        super(message),
        this.statusCode=statusCode
    }
}