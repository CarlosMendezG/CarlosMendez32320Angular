import { TestBed } from "@angular/core/testing";
import { ClientesService } from "./clientes.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Cliente } from "../models/cliente";

describe('Clientes Servicio', () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: ClientesService;

    beforeEach((() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ]
        });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new ClientesService(httpClientSpy as any);
    }));

    it('El servicio se inicializa correctamente', () => {
        expect(service).toBeTruthy();
    });

    it('El servicio nos regresa un listado de clientes mockeados', (done: DoneFn) => {
        const datosMockeados: Cliente[] = [
            { "cliente": "Cliente Juan Perez", "rfc": "", "regimenFiscal": "625", "cp": "15783", "correo": "juan.perez@hotmail.com", "responsable": "Simonis", "comentarios": "comentarios 1", "idNEWeb": "idNEWeb 1", "id": 1 },
            { "cliente": "Anabel.Botsford", "rfc": "Regional Web Strategist", "regimenFiscal": "regimenFiscal 2", "cp": "53116", "correo": "Yazmin_Jakubowski@hotmail.com", "responsable": "Bednar", "comentarios": "comentarios 2", "idNEWeb": "idNEWeb 2", "id": 2 },
            { "cliente": "CLIENTE 3", "rfc": "RFC 3", "regimenFiscal": "regimenFiscal 3", "cp": "02297-4635", "correo": "Winston_Hirthe30@hotmail.com", "responsable": "Bernier", "comentarios": "comentarios 3", "idNEWeb": "idNEWeb 3", "id": 3 },
            { "cliente": "Kaleb.Torphy67", "rfc": "Internal Factors Technician", "regimenFiscal": "regimenFiscal 6", "cp": "44803", "correo": "Wade13@gmail.com", "responsable": "Hane", "comentarios": "comentarios 6", "idNEWeb": "idNEWeb 6", "id": 6 }
        ];

        httpClientSpy.get.and.returnValue(of(datosMockeados));

        service.obtenerClientesHttp().subscribe((Cliente) => {
            expect(Cliente).toEqual(datosMockeados);
            done();
        });

    });

});