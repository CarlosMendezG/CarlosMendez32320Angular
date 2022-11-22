import { Usuario } from "./usuario";

export interface Sesión {
    activa: boolean;
    usuario: Usuario | undefined;
}