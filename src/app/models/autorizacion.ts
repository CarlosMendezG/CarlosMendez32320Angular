import { Solicitud } from "./solicitud";

export interface Autorizacion extends Solicitud {
    invoicesId: number;
    factura: string;
    fechaFactura: Date;
    autorizacion: string;
    authBy: string;
    ace_InvoiceId: number;
}