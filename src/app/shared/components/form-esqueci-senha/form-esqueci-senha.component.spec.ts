import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormEsqueciSenhaComponent } from './form-esqueci-senha.component';

describe('FormEsqueciSenhaComponent', () => {
  let component: FormEsqueciSenhaComponent;
  let fixture: ComponentFixture<FormEsqueciSenhaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEsqueciSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEsqueciSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
