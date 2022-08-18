import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCadastroDesaparecidosComponent } from './form-cadastro-desaparecidos.component';

describe('FormCadastroDesaparecidosComponent', () => {
  let component: FormCadastroDesaparecidosComponent;
  let fixture: ComponentFixture<FormCadastroDesaparecidosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadastroDesaparecidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroDesaparecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
