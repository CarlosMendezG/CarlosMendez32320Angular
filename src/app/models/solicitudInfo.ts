import { Solicitud } from "./solicitud";

export interface SolicitudInfo extends Solicitud {
    appNombre: string;
    cliente: string;
    correoCliente: string;
    usuarioAsignado: string;
}