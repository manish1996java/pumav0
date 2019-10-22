import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
var SignupComponent = /** @class */ (function () {
    function SignupComponent(authService) {
        this.authService = authService;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signUpForm = new FormGroup({
            'firstName': new FormControl(null, [Validators.required]),
            'lastName': new FormControl(null, [Validators.required]),
            'userData': new FormGroup({
                'email': new FormControl(null, [Validators.required]),
                'password': new FormControl(null, [Validators.required])
            }),
            'mobile': new FormControl(null, [Validators.required]),
            'password': new FormControl(null, [Validators.required]),
            'confPassword': new FormControl(null, [Validators.required])
        });
    };
    SignupComponent.prototype.onSubmit = function () {
        var user = this.signUpForm.get('userData').value;
        this.authService.signUp(user);
        this.signUpForm.reset();
    };
    SignupComponent = tslib_1.__decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map