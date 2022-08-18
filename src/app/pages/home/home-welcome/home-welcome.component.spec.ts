import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeWelcomeComponent } from './home-welcome.component';

describe('HomeWelcomeComponent', () => {
  let component: HomeWelcomeComponent;
  let fixture: ComponentFixture<HomeWelcomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
