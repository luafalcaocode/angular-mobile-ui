import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleListComponent } from './simple-list.component';

describe('SimpleListComponent', () => {
  let component: SimpleListComponent;
  let fixture: ComponentFixture<SimpleListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
