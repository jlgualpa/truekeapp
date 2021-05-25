import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoIntercambioComponent } from './proceso-intercambio.component';

describe('ProcesoIntercambioComponent', () => {
  let component: ProcesoIntercambioComponent;
  let fixture: ComponentFixture<ProcesoIntercambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoIntercambioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoIntercambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
