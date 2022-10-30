import { Usuario } from "./usuario";

export interface Sesion {
    activa: boolean;
    usuario: Usuario | undefined;
}