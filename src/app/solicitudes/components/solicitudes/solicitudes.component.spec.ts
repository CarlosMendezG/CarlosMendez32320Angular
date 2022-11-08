import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/core/material.module';

import { SolicitudesComponent } from './solicitudes.component';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('SolicitudesComponent', () => {
  let component: SolicitudesComponent;
  let fixture: ComponentFixture<SolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule, HttpClientModule, BrowserAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [SolicitudesComponent],
      providers: [
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        }
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
