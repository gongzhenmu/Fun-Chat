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

    updateCurrentUserId(){
    	if(this.authState!==null){
        this.currentUserId = this.authState.user.uid;
      }else{
        this.currentUserId = '';
      }
    	
   }

   login(email:string,password:string){
   	this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
           this.authState = userCredential;
          this.setUserStatus('online');
          this.router.navigate(['chat']);
        }).catch(error => alert(error));

   }


   signUp(email: string, password: string, displayName: string) {
     this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then(user => {

                this.authState = user;
                const status = 'online';
                
                this.setUserData(email, displayName, status);
                this.router.navigate(['chat']);

              }).catch(error => alert(error));
    }

    setUserStatus(status: string): void {
    	this.updateCurrentUserId();
      const path = `users/${this.currentUserId}`;

      const data = {
        status: status
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }


    setUserData(email:string,displayName:string,status:string):void{
      this.updateCurrentUserId();
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
