import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseroomComponent } from './chooseroom.component';

describe('ChooseroomComponent', () => {
  let component: ChooseroomComponent;
  let fixture: ComponentFixture<ChooseroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
