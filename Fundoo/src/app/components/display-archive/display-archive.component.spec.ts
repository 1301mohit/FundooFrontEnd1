import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArchiveComponent } from './display-archive.component';

describe('DisplayArchiveComponent', () => {
  let component: DisplayArchiveComponent;
  let fixture: ComponentFixture<DisplayArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
