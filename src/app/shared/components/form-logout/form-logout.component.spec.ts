import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormLogoutComponent } from './form-logout.component';

describe('FormLogoutComponent', () => {
  let component: FormLogoutComponent;
  let fixture: ComponentFixture<FormLogoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
