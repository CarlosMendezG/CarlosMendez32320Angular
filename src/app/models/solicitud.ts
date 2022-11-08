export interface Solicitud {
    id: number;
    appId: string;
    version: number;
    ace_ClientId: number;
    fechaRegistro: Date;
    tipoMovimiento: string;
    solicitud: string;
    numHDD: string;
    numHDDSrv: string;
    plataforma: string;
    dato1: string;
    dato2: string;
    datoFecha: Date;
    observaciones: string;
    pagoTipo: string;
    pagoFolio: string;
    pagoFecha: Date;
    pagoImporte: number;
    pagoImagen: Blob;
    asignadoA: string;
    pagoCfdiAdd: number;
}