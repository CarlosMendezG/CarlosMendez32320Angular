import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClienteState } from 'src/app/models/cliente.state';
import { Estados } from 'src/app/models/states';
import * as fromClientes from './clientes.reducer';

export const selectClienteState = createFeatureSelector<ClienteState>(
    fromClientes.clientesFeatureKey
);

export const selectStateCliente = createSelector(
    selectClienteState,
    (state: ClienteState) => state.clientes
)

export const selectStateEstado = createSelector(
    selectClienteState,
    (state: ClienteState) => state.estado
)

export const selectStateCargado = createSelector(
    selectClienteState,
    (state: ClienteState) => state.estado <= Estados.datosCargados
)