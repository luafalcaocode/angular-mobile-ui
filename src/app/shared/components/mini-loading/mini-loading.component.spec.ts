import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MiniLoadingComponent } from './mini-loading.component';

describe('MiniLoadingComponent', () => {
  let component: MiniLoadingComponent;
  let fixture: ComponentFixture<MiniLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
