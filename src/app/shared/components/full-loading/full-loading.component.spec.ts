import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullLoadingComponent } from './full-loading.component';

describe('FullLoadingComponent', () => {
  let component: FullLoadingComponent;
  let fixture: ComponentFixture<FullLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
