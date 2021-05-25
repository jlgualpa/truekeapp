import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPublicacionComponent } from './detail-publicacion.component';

describe('DetailPublicacionComponent', () => {
  let component: DetailPublicacionComponent;
  let fixture: ComponentFixture<DetailPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
