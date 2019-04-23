import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs'
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
  userName: Observable<string>;



 constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        //this.afAuth.authState.subscribe(auth => {
        //  if (auth !== undefined && auth !== null) {
         //   this.user = auth;
        //  }

        //  this.getUser().subscribe(a => {
        //    this.userName = a.displayName;
        //  });
        //});
    }


 getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(25));

  }


 getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
 }


  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    const email = 'test@example.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      //userName: this.userName,
      userName: 'test:user',
      email: email
      

    });

    console.log('called');
  }





    getUsers() {
        const path = '/users';
        return this.db.list(path);
      }

    getTimeStamp() {
      const now = new Date();
      const date = now.getUTCFullYear() + '/' +
                   (now.getUTCMonth() + 1) + '/' +
                   now.getUTCDate();
      const time = now.getUTCHours() + ':' +
                   now.getUTCMinutes() + ':' +
                   now.getUTCSeconds();

      return (date + ' ' + time);
    }
  
}
