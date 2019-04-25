import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chatroom2Component } from './chatroom2.component';

describe('Chatroom2Component', () => {
  let component: Chatroom2Component;
  let fixture: ComponentFixture<Chatroom2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chatroom2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chatroom2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
