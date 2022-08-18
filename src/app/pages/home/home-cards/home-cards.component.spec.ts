import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeCardsComponent } from './home-cards.component';

describe('HomeCardsComponent', () => {
  let component: HomeCardsComponent;
  let fixture: ComponentFixture<HomeCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
