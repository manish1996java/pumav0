import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authservice:AuthService) { }

  loginForm:FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required]),
    });
  }
  onSubmit(){
    this.authservice.login(this.loginForm.value);
    this.loginForm.reset();
  }
  googleSignIn(){
    this.authservice.googleSignIn(this.loginForm.value);
  }
}
