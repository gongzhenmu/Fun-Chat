import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private user: Observable<firebase.User>;
	private authState:any;
	private currentUserId:string;

  constructor(private afAuth: AngularFireAuth,private db: AngularFireDatabase, private router: Router) {

  	this.user = afAuth.authState;
  	this.afAuth.authState.subscribe(auth=>{
  		this.authState=auth;
  		if(this.authState!==null){
  			this.currentUserId = this.authState.uid;
  		 }
  		
  	});
   }
    authUser() {
      return this.user;
    }

   //  get CurrentUserId():string{
   //  	// return this.authState!==null ?this.authState.uid:'';
   //  	 if(this.authState!==null){
  	// 	 	this.currentUserId = this.authState.uid;
  	// 	 }else{
  	// 	 	this.currentUserId = '';

  	// 	 }
   //     return this.CurrentUserId;
   // }

   login(email:string,password:string){
   	return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.currentUserId=this.authState.uid;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        });

   }


   signUp(email: string, password: string, displayName: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                const status = 'online';
                this.setUserData(email, displayName, status);
              }).catch(error => console.log(error));
    }

    setUserStatus(status: string): void {
    	
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }


    setUserData(email:string,displayName:string,status:string):void{
  
    	const path= `users/${this.currentUserId}`;
    	console.log(path);
    	const data= {
    		email:email,
    		displayName:displayName,
    		status:status
    	};
    	this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    
    logout() {
      this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }
    
}
