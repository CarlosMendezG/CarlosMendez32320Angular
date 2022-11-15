export interface Solicitud {
    id: number;
    appId: string;
    version: number;
    ace_ClientId: number;
    fechaRegistroTxt: string;
    fechaRegistro: Date;
    tipoMovimiento: string;
    solicitud: string;
    numHDD: string;
    numHDDSrv: string;
    plataforma: string;
    dato1: string;
    dato2: string;
    datoFechaTxt: string;
    datoFecha: Date;
    observaciones: string;
    pagoTipo: string;
    pagoFolio: string;
    pagoFechaTxt: string;
    pagoFecha: Date;
    pagoImporte: number;
    asignadoA: string;
    pagoCfdiAdd: number;
}