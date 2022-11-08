import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/core/material.module';
import { ClientesComponent } from './clientes.component';

export class MatDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of({ action: true })
        };
    }
}

describe('Pruebas unitarias Clientes', () => {
    let component: ClientesComponent;
    let fixture: ComponentFixture<ClientesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MaterialModule, HttpClientModule, BrowserAnimationsModule,
                HttpClientModule
            ],
            declarations: [ClientesComponent],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                }
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClientesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Se crea el componente', () => {
        expect(component).toBeTruthy();
    });

    it('El formulario se mantiene invalido cuando no ingreso todos los valores requeridos', () => {
        const form = component.formularioReactivo;
        const campoId = form.controls['id'];
        const campoNombre = form.controls['nombre'];
        // const campoRfc = form.controls['rfc'];

        campoId.setValue('123');
        campoNombre.setValue('Nombre');

        expect(form.invalid).toBeTruthy();
    });

    it('El formulario es valido cuando se ingresan todos los valores requeridos', () => {
        const form = component.formularioReactivo;
        const campoId = form.controls['id'];
        const campoNombre = form.controls['nombre'];
        const campoRfc = form.controls['rfc'];

        campoId.setValue('123');
        campoNombre.setValue('Nombre');
        campoRfc.setValue('AAAA010101A01');

        expect(form.valid).toBeTruthy();
    });

    it('El formulario se renderiza al dar clic al botón de agregar', () => {
        const form = component.formularioReactivo;
        const campoId = form.controls['id'];
        const campoNombre = form.controls['nombre'];
        const campoRfc = form.controls['rfc'];

        campoId.setValue('123');
        campoNombre.setValue('Nombre');
        campoRfc.setValue('AAAA010101A01');

        const boton = fixture.debugElement.query(By.css('#btnAgregar'));
        boton.nativeElement.click();
        fixture.detectChanges();

        const detalleClienteRef = fixture.debugElement.query(By.css('#detalle-cliente'));

        expect(detalleClienteRef).toBeTruthy();
    });
});