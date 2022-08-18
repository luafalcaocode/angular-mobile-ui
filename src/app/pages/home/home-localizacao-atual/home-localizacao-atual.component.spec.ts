import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLocalizacaoAtualComponent } from './home-localizacao-atual.component';

describe('HomeLocalizacaoAtualComponent', () => {
  let component: HomeLocalizacaoAtualComponent;
  let fixture: ComponentFixture<HomeLocalizacaoAtualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLocalizacaoAtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLocalizacaoAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
