import { createReducer, on } from "@ngrx/store";
import { ClienteState } from "src/app/models/cliente.state";
import * as ClientesActions from './clientes.actions';

export const clientesFeatureKey = 'cliente';

export const estadoInicial: ClienteState = {
    estado: false,
    clientes: [],
    clienteSeleccionado: -1
};

export const reducer = createReducer(
    estadoInicial,
    on(ClientesActions.clientesInicializar, (state) => {
        return { ...state, estado: false, clientes: [] }
    }),
    on(ClientesActions.clientesCargar, (state, { clientes }) => {
        return { ...state, estado: true, clientes }
    }),
    on(ClientesActions.clientesCargarError, (state, { error }) => {
        return { ...state, estado: true, error }
    }),
    on(ClientesActions.clientesAgregar, (state, { cliente }) => {
        return { ...state, estado: true, cliente }
    }),
    on(ClientesActions.clientesAgregarError, (state, { error }) => {
        return { ...state, estado: true, error }
    }),
    on(ClientesActions.clientesModificar, (state, { cliente }) => {
        return { ...state, estado: true, cliente }
    }),
    on(ClientesActions.clientesModificarError, (state, { error }) => {
        return { ...state, estado: true, error }
    }),
    on(ClientesActions.clientesEliminar, (state, { cliente }) => {
        return { ...state, estado: true, cliente }
    }),
    on(ClientesActions.clientesEliminarError, (state, { error }) => {
        return { ...state, estado: true, error }
    }),
    on(ClientesActions.clientesSeleccionar, (state, { seleccionado }) => {
        return { ...state, estado: true, clienteSeleccionado: seleccionado }
    }),
    on(ClientesActions.clientesObtenerSeleccionado, (state, { cliente }) => {        
        let indexCliente: number =  estadoInicial.clientes.findIndex(x => x.id == estadoInicial.clienteSeleccionado);
        if (indexCliente < 0) indexCliente = 0;
        cliente = estadoInicial.clientes[indexCliente];
        return { ...state, estado: true, cliente }
    }),
);