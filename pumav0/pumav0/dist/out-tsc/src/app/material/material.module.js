import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';
var materials = [
    MatButtonModule,
    MatDialogModule,
    MatInputModule
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = tslib_1.__decorate([
        NgModule({
            imports: materials,
            exports: materials
        })
    ], MaterialModule);
    return MaterialModule;
}());
export { MaterialModule };
//# sourceMappingURL=material.module.js.map