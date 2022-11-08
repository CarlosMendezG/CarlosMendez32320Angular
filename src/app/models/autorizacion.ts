import { Solicitud } from "./solicitud";

export interface Autorizacion extends Solicitud {
    tipoRegistro: string;
    invoicesId: number;
    factura: string;
    fechaFactura: Date;
    autorizacion: string;
    authBy: string;
    ace_InvoiceId: number;
}