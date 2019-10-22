import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(authservice) {
        this.authservice = authservice;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.authservice.autoAuthUser();
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map