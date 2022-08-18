import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditInFormComponent } from './edit-in-form.component';

describe('EditInFormComponent', () => {
  let component: EditInFormComponent;
  let fixture: ComponentFixture<EditInFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
