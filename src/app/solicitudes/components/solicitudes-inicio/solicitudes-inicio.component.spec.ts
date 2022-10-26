import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesInicioComponent } from './solicitudes-inicio.component';

describe('SolicitudesInicioComponent', () => {
  let component: SolicitudesInicioComponent;
  let fixture: ComponentFixture<SolicitudesInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
