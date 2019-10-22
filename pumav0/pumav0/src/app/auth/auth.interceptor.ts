import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from './auth.service';
import { NgModule, Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private authservice:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token=this.authservice.getToken();
        console.log(token);
        const clonereq = req.clone({
            headers: req.headers.set("Authorization","Bearer "+token)
        })
        return next.handle(clonereq);
    }
    
}