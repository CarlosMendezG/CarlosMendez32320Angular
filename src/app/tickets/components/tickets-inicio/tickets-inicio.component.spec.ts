import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsInicioComponent } from './tickets-inicio.component';

describe('TicketsInicioComponent', () => {
  let component: TicketsInicioComponent;
  let fixture: ComponentFixture<TicketsInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
