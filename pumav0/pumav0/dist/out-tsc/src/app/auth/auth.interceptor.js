import * as tslib_1 from "tslib";
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(authservice) {
        this.authservice = authservice;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var token = this.authservice.getToken();
        console.log(token);
        var clonereq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(clonereq);
    };
    AuthInterceptor = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map