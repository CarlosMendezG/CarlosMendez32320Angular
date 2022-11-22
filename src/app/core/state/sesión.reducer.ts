import { createReducer, on } from "@ngrx/store";
import { Sesión } from "src/app/models/sesión";
import * as SesiónActions from "./sesión.actions";

export const sesiónFeatureKey = 'sesión';

export const estadoInicial: Sesión = {
  activa: false,
  usuario: undefined
};

export const reducer = createReducer(
  estadoInicial,
  on(SesiónActions.cargarSesión, state => state),
  on(SesiónActions.asignarSesiónActiva, (state, { sesión }) => {    
    return { ...state, activa: sesión.activa, usuario: sesión.usuario }
  }),
  on(SesiónActions.cargarSesiónActiva, (state, { usuarioActivo }) => {
      return { ...state, activa: true, usuario: usuarioActivo }
  })
);