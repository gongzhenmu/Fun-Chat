import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatroomComponent } from './app/chatroom/chatroom.component';
import { Chatroom2Component } from './app/chatroom2/chatroom2.component';
import { Chatroom3Component } from './app/chatroom3/chatroom3.component';
import { ChooseroomComponent } from './app/chooseroom/chooseroom.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: 'chat2', component: Chatroom2Component },
    { path: 'chat3', component: Chatroom3Component },
    { path: 'chooseroom', component: ChooseroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
