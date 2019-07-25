import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabelNoteComponent } from './edit-label-note.component';

describe('EditLabelNoteComponent', () => {
  let component: EditLabelNoteComponent;
  let fixture: ComponentFixture<EditLabelNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabelNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabelNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
