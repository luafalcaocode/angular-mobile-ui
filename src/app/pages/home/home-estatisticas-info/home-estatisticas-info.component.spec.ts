import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeEstatisticasInfoComponent } from './home-estatisticas-info.component';

describe('HomeEstatisticasInfoComponent', () => {
  let component: HomeEstatisticasInfoComponent;
  let fixture: ComponentFixture<HomeEstatisticasInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstatisticasInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstatisticasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
