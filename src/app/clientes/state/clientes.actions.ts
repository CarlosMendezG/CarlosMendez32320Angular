import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/models/cliente";
import { Estados } from "src/app/models/states";

export const inicializarClientes = createAction(
    '[Clientes] Inicializar Clientes'
);

export const loadClientes = createAction(
    '[Clientes] Load Clientes'
);

export const loadClientesSuccess = createAction(
    '[Clientes] Load Clientes Success',
    props<{ clientes: Cliente[] }>()
);

export const loadClientesFailure = createAction(
    '[Clientes] Load Clientes Failure',
    props<{ error: any }>()
);

export const loadClientesEstado = createAction(
    '[Clientes] Load Clientes Estados',
    props<{ estado: Estados }>()
);