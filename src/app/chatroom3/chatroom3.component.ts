import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { room } from '../../environments/environment';

@Component({
  selector: 'app-chatroom3',
  templateUrl: './chatroom3.component.html',
  styleUrls: ['./chatroom3.component.css']
})
export class Chatroom3Component implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;

  constructor() { 
  	}

  ngOnInit() {
  	room.isRoom1=false;
  	room.isRoom2=false;
  	room.isRoom3=true;
  }

  scrollToBottom(): void {
    // this.feedContainer.nativeElement.scrollTop
    // = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
