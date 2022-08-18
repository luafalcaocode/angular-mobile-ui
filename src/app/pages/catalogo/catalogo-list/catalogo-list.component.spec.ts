import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogoListComponent } from './catalogo-list.component';

describe('CatalogoListComponent', () => {
  let component: CatalogoListComponent;
  let fixture: ComponentFixture<CatalogoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
