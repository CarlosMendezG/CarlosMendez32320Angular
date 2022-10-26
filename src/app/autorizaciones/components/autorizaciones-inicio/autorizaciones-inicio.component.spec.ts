import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionesInicioComponent } from './autorizaciones-inicio.component';

describe('AutorizacionesInicioComponent', () => {
  let component: AutorizacionesInicioComponent;
  let fixture: ComponentFixture<AutorizacionesInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionesInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionesInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
