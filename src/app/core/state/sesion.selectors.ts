import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Sesión } from 'src/app/models/sesión';
import * as fromSesión from './sesión.reducer';

export const selectSesiónState = createFeatureSelector<Sesión>(
  fromSesión.sesiónFeatureKey
);

export const selectSesiónActiva = createSelector(
  selectSesiónState,
  (state) => state
)

export const asignarSesiónActiva = createSelector(
  selectSesiónState,
  (state) => state
)