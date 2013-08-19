var util = require('util');

function BaseError(mssg, statusCode) {
    Error.call(this, mssg);

    this.message = mssg;
    this.statusCode = statusCode;
}
util.inherits(BaseError, Error);

function MethodNotSupportedError(method) {
    BaseError.call(this, 'Method not supported: ' + method, 405);
}
util.inherits(MethodNotSupportedError, BaseError);


function NotFoundError(path) {
    BaseError.call(this, 'Not found: ' + path, 404);
}
util.inherits(NotFoundError, BaseError);


function InternalServerError() {
    BaseError.call(this, 'Internal Server Error', 502);
}
util.inherits(InternalServerError, BaseError);


function Unauthorized() {
    BaseError.call(this, 'Unauthorized', 401);
}
util.inherits(Unauthorized, BaseError);

module.exports = {
    MethodNotSupportedError: MethodNotSupportedError,
    NotFoundError: NotFoundError,
    InternalServerError: InternalServerError,
    Unauthorized: Unauthorized
};