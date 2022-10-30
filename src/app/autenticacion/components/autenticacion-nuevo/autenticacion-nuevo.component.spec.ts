import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticacionNuevoComponent } from './autenticacion-nuevo.component';

describe('AutenticacionNuevoComponent', () => {
  let component: AutenticacionNuevoComponent;
  let fixture: ComponentFixture<AutenticacionNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutenticacionNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutenticacionNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
