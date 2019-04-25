import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatroom3Component } from './chatroom3.component';

describe('Chatroom3Component', () => {
  let component: Chatroom3Component;
  let fixture: ComponentFixture<Chatroom3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chatroom3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chatroom3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
