import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
 

 @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
  getUserName(email: string):string{
      var n = email.indexOf('@');
      return email.substr(0,n);


    }

}
