import { Cliente } from "./cliente";
import { Estados } from "./states";

export interface ClienteState {
    estado: Estados;
    clientes: Cliente[];
}