import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.gettoken = new Subject();
        this.isAuth = new Subject();
        this.isAuthenticate = false;
    }
    AuthService.prototype.signUp = function (user) {
        this.http.post('http://localhost:3000/user/signup', user).subscribe(function (res) {
            console.log(res);
        });
    };
    AuthService.prototype.login = function (user) {
        var _this = this;
        this.http.post('http://localhost:3000/user/login', user).subscribe(function (res) {
            var token = res.token;
            _this.token = token;
            console.log("this is response", res);
            if (token) {
                _this.router.navigate(['/']);
                var expiresin = res.expiresin;
                var now = new Date();
                var expiresDate = new Date(now.getTime() + expiresin * 1000);
                console.log(expiresDate);
                _this.saveAuthLocal(token, expiresDate);
                _this.setAuthtimer(expiresin);
                _this.gettoken.next(res.token);
                _this.isAuth.next(true);
                _this.isAuthenticate = true;
            }
        });
    };
    AuthService.prototype.logout = function () {
        this.token = null;
        this.isAuth.next(false);
        this.isAuthenticate = false;
        this.gettoken.next(this.token);
        clearTimeout(this.timer);
        this.clearAuthLocal();
        this.router.navigate(['/login']);
        console.log(this.token);
    };
    AuthService.prototype.setAuthtimer = function (duration) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.logout();
        }, duration * 1000);
    };
    AuthService.prototype.saveAuthLocal = function (token, expiresDate) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresin', expiresDate.toISOString());
    };
    AuthService.prototype.autoAuthUser = function () {
        var authinfo = this.getAuthData();
        if (!authinfo) {
            return;
        }
        var now = new Date();
        var expiresin = authinfo.expiresin.getTime() - now.getTime();
        if (expiresin > 0) {
            this.setAuthtimer(expiresin / 1000);
            this.token = authinfo.token;
            this.isAuth.next(true);
            this.isAuthenticate = true;
            console.log(authinfo.token);
            this.gettoken.next(this.token);
        }
    };
    AuthService.prototype.clearAuthLocal = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresin');
    };
    AuthService.prototype.getAuthData = function () {
        var token = localStorage.getItem('token');
        var expiresin = localStorage.getItem('expiresin');
        if (!token && !expiresin) {
            return;
        }
        return {
            token: token,
            expiresin: new Date(expiresin)
        };
    };
    AuthService.prototype.googleSignIn = function (user) {
        this.http.post('http://localhost:3000/user/passportlogin', user).subscribe(function (res) {
            console.log(res);
        });
    };
    AuthService.prototype.getAuthStatus = function () {
        return this.isAuth.asObservable();
    };
    AuthService.prototype.getIsAuth = function () {
        return this.isAuthenticate;
    };
    AuthService.prototype.tokenLitener = function () {
        return this.gettoken.asObservable();
    };
    AuthService.prototype.getToken = function () {
        return this.token;
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Router])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map