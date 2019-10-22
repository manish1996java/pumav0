import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;  

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required]),
      'lastName': new FormControl(null,[Validators.required]),
      'userData': new FormGroup({
        'email': new FormControl(null,[Validators.required]),
        'password': new FormControl(null,[Validators.required])
        }),
      'mobile': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required]),
      'confPassword': new FormControl(null,[Validators.required])
    }) 
  }

  
  onSubmit(){
    const user = this.signUpForm.get('userData').value;
    this.authService.signUp(user);
    this.signUpForm.reset();
  }
  
}
