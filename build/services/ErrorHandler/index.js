"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    throwError(errorMsg, values) {
        throw new Error(`${errorMsg} ${values ?? ''}`);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=index.js.map