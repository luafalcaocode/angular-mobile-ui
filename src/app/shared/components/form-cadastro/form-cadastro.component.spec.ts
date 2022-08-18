import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCadastroComponent } from './form-cadastro.component';

describe('FormCadastroComponent', () => {
  let component: FormCadastroComponent;
  let fixture: ComponentFixture<FormCadastroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
