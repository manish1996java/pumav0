import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(diloge, authService) {
        this.diloge = diloge;
        this.authService = authService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAuth = this.authService.getIsAuth();
        this.authService.getAuthStatus().subscribe(function (isAuth) {
            console.log(isAuth);
            _this.isAuth = isAuth;
        });
        console.log(this.isAuth);
    };
    HeaderComponent.prototype.openDialog = function () {
        var dilogeref = this.diloge.open(null, {
            width: '250px'
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    HeaderComponent = tslib_1.__decorate([
        Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [MatDialog, AuthService])
    ], HeaderComponent);
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map