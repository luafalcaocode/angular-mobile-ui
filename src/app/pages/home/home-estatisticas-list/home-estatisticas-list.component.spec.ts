import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeEstatisticasListComponent } from './home-estatisticas-list.component';

describe('HomeEstatisticasListComponent', () => {
  let component: HomeEstatisticasListComponent;
  let fixture: ComponentFixture<HomeEstatisticasListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeEstatisticasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstatisticasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
