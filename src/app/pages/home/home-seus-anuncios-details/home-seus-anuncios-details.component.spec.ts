import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeSeusAnunciosDetailsComponent } from './home-seus-anuncios-details.component';

describe('HomeSeusAnunciosDetailsComponent', () => {
  let component: HomeSeusAnunciosDetailsComponent;
  let fixture: ComponentFixture<HomeSeusAnunciosDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSeusAnunciosDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSeusAnunciosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
