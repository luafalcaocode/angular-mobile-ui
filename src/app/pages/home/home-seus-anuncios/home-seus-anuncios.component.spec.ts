import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeSeusAnunciosComponent } from './home-seus-anuncios.component';

describe('HomeSeusAnunciosComponent', () => {
  let component: HomeSeusAnunciosComponent;
  let fixture: ComponentFixture<HomeSeusAnunciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSeusAnunciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSeusAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
