import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
	email:string;
	password:string;
	displayName:string;
	errorMsg:boolean = true ;


  constructor(private authService: AuthService,private router:Router) { }

  signUp() {
  	const email = this.email;
  	const password = this.password;
  	const displayName = this.displayName;
  	this.authService.signUp(email,password,displayName);

   //  if(this.errorMsg ===null || this.errorMsg===undefined){
   //    this.router.navigate(['chat']);
   //  }
   // else{

   // }

    
  }

  ngOnInit(){}
}
