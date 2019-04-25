import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { room } from '../../environments/environment';
@Component({
  selector: 'app-chatroom2',
  templateUrl: './chatroom2.component.html',
  styleUrls: ['./chatroom2.component.css']
})
export class Chatroom2Component implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { 
  	}

  ngOnInit() {
  	room.isRoom1=false;
  	room.isRoom2=true;
  	room.isRoom3=false;
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}

