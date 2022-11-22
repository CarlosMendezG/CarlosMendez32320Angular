import { Cliente } from "./cliente";

export interface ClienteState {
    estado: boolean;
    clientes: Cliente[];
    clienteSeleccionado: number;
}