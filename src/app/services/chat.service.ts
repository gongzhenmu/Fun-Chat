import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable'
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { ChatMessage } from '../models/chat-message.model';




@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;

  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;



 constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(auth => {
         if (auth !== undefined && auth !== null) {
           this.user = auth;
         }

          // this.getUser().valueChanges().subscribe(a => {
          //   this.userName = a.displayName;
          // });
        });
    }


 getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(10));

  }



 getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    console.log(path)
    return this.db.object(path);
 }


  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.setUserName(email),
      email: email
      

    });
    
    console.log(this.userName);
  }





    getUsers() {
        const path = '/users';
        return this.db.list(path);
      }

    getTimeStamp() {
      const now = new Date();
      const date = now.getFullYear() + '/' +
                   (now.getMonth() + 1) + '/' +
                   now.getDate();
      const time = now.getHours() + ':' +
                   now.getMinutes() + ':' +
                   now.getSeconds();

      return (date + ' ' + time);
    }



    setUserName(email: string):string{
      var n = email.indexOf('@');
      return email.substr(0,n);


    }
  
}
