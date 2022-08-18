import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeEstatisticasComponent } from './home-estatisticas.component';

describe('HomeEstatisticasComponent', () => {
  let component: HomeEstatisticasComponent;
  let fixture: ComponentFixture<HomeEstatisticasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstatisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
