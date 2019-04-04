import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRemainderComponent } from './display-remainder.component';

describe('DisplayRemainderComponent', () => {
  let component: DisplayRemainderComponent;
  let fixture: ComponentFixture<DisplayRemainderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRemainderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRemainderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
