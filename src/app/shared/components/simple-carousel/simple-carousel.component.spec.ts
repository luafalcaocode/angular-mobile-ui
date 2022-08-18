import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleCarouselComponent } from './simple-carousel.component';

describe('SimpleCarouselComponent', () => {
  let component: SimpleCarouselComponent;
  let fixture: ComponentFixture<SimpleCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
