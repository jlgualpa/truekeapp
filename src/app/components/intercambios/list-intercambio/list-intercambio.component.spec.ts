import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIntercambioComponent } from './list-intercambio.component';

describe('ListIntercambioComponent', () => {
  let component: ListIntercambioComponent;
  let fixture: ComponentFixture<ListIntercambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIntercambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIntercambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
