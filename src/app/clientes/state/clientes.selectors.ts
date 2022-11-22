import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClienteState } from 'src/app/models/cliente.state';
import * as fromClientes from './clientes.reducer';

export const selectClienteState = createFeatureSelector<ClienteState>(
    fromClientes.clientesFeatureKey
);

export const selectClientes = createSelector(
    selectClienteState,
    (state: ClienteState) => state.clientes
)

export const selectEstadoCliente = createSelector(
    selectClienteState,
    (state: ClienteState) => state.estado
)


export const obtenerCliente = createSelector(
    selectClienteState,
    (state: ClienteState) => {
        let indexCliente: number =  state.clientes.findIndex(x => x.id == state.clienteSeleccionado);
        if (indexCliente < 0) indexCliente = 0;
        return state.clientes[indexCliente];
    }
)