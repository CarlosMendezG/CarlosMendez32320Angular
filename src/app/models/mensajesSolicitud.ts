export interface MensajesSolicitud {
    id: number;
    idSolicitud: number;
    via: TipoVia;
    mensaje: string;
    fecha: Date;
}

export enum TipoVia {
    cliente = 0,
    soporte = 1,
    sistemas = 2,
    administracion = 3
}