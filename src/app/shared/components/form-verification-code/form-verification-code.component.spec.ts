import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormVerificationCodeComponent } from './form-verification-code.component';

describe('FormVerificationCodeComponent', () => {
  let component: FormVerificationCodeComponent;
  let fixture: ComponentFixture<FormVerificationCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVerificationCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVerificationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
