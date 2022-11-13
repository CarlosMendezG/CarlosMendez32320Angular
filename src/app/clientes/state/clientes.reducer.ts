import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { ClienteState } from "src/app/models/cliente.state";
import { Estados } from "src/app/models/states";
import * as ClientesActions from './clientes.actions';

export const clientesFeatureKey = 'cliente';

export const estadoInicial: ClienteState = {
    estado: Estados.sinInicializar,
    clientes: []
};

export const reducer = createReducer(
    estadoInicial,
    on(ClientesActions.inicializarClientes, (state) => {
        return { ...state, estado: Estados.sinInicializar, clientes: [] }
    }),
    on(ClientesActions.loadClientes, state => {
        return { ...state, estado: Estados.cargando }
    }),
    on(ClientesActions.loadClientesSuccess, (state, { clientes }) => {
        return { ...state, estado: Estados.datosCargados, clientes }
    }),
    on(ClientesActions.loadClientesFailure, (state, { error }) => {
        return { ...state, estado: Estados.error, error }
    }),
    on(ClientesActions.loadClientesEstado, (state, { estado }) => {
        return { ...state, estado }
    }),
);