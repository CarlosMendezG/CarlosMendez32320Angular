import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionInicioComponent } from './facturacion-inicio.component';

describe('FacturacionInicioComponent', () => {
  let component: FacturacionInicioComponent;
  let fixture: ComponentFixture<FacturacionInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
