import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth:boolean; 
  constructor(public diloge:MatDialog,private authService:AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authService.getAuthStatus().subscribe((isAuth:boolean)=>{
      console.log(isAuth);
      this.isAuth = isAuth; 
    })
    console.log(this.isAuth);
  }

  openDialog():void{
    const dilogeref = this.diloge.open(null,{
      width:'250px'
    })
  }

  logout(){
    this.authService.logout();
  }

}
