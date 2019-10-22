import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authservice) {
        this.authservice = authservice;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        this.authservice.login(this.loginForm.value);
        this.loginForm.reset();
    };
    LoginComponent.prototype.googleSignIn = function () {
        this.authservice.googleSignIn(this.loginForm.value);
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map