import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private gettoken = new Subject();
  private isAuth = new Subject();
  private isAuthenticate:boolean = false;
  private token:string;
  private timer:NodeJS.Timer;
  

  constructor(private http:HttpClient,private router:Router) { }



  signUp(user:User){
      this.http.post<{message:String}>('http://localhost:3000/user/signup',user).subscribe((res)=>{
        console.log(res);
      })
  }

  login(user:User){
    this.http.post<{message:string,token:string,expiresin:number}>('http://localhost:3000/user/login',user).subscribe((res)=>{
      const token = res.token;
      this.token = token;
      
      console.log("this is response",res);
      if(token){
        this.router.navigate(['/']);
        const expiresin:number = res.expiresin;
        const now  = new Date();
        const expiresDate = new Date(now.getTime() + expiresin * 1000);
        console.log(expiresDate);
        this.saveAuthLocal(token,expiresDate);
        this.setAuthtimer(expiresin);
        this.gettoken.next(res.token);
        this.isAuth.next(true);
        this.isAuthenticate = true;
      }
      
    })
  }

  logout(){
    this.token = null;
    this.isAuth.next(false);
    this.isAuthenticate = false;
    this.gettoken.next(this.token); 
    clearTimeout(this.timer);
    this.clearAuthLocal();
    this.router.navigate(['/login']);
    console.log(this.token);
  } 


  private setAuthtimer(duration:number){
    this.timer = setTimeout(()=>{
      this.logout();      
    },duration * 1000);
  }


  private saveAuthLocal(token:string, expiresDate: Date){
    localStorage.setItem('token',token); // 10 mb storage
    localStorage.setItem('expiresin', expiresDate.toISOString());
    sessionStorage.setItem('token',token); // 1-2 kb storage
    sessionStorage.setItem('expiresin', expiresDate.toISOString());
  }
    autoAuthUser(){
    const authinfo = this.getAuthData();
    if(!authinfo){
      return;
    }

    const now = new Date();
    const expiresin = authinfo.expiresin.getTime() - now.getTime();
    
    if(expiresin > 0){
      this.setAuthtimer(expiresin / 1000);
      this.token = authinfo.token;
      this.isAuth.next(true);
      this.isAuthenticate = true;
      console.log(authinfo.token);
      this.gettoken.next(this.token);
      
    }
  }
  private clearAuthLocal(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresin');
  }
  private getAuthData(){
    const token = localStorage.getItem('token');
    const expiresin = localStorage.getItem('expiresin');
    if(!token && !expiresin){
      return;
    }
    return {
      token:token,
      expiresin: new Date(expiresin)
    };
  }
  googleSignIn(user:User){
    this.http.post('http://localhost:3000/user/passportlogin',user).subscribe((res)=>{
      console.log(res);
    })
  }

  getAuthStatus(){
    return this.isAuth.asObservable();
  }
  getIsAuth(){
    return this.isAuthenticate;
  }

  tokenLitener(){
    return this.gettoken.asObservable();
  }

  getToken(){
    return this.token;
  }
}
