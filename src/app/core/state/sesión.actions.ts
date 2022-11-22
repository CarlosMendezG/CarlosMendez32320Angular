import { createAction, props } from "@ngrx/store";
import { Sesión } from "src/app/models/sesión";
import { Usuario } from "src/app/models/usuario";

export const cargarSesión = createAction(
  '[Sesión] Cargar Sesión'
);

export const asignarSesiónActiva = createAction(
  '[Sesión] Asignar Sesión Activa',
  props<{ sesión: Sesión }>()
)

export const cargarSesiónActiva = createAction(
  '[Sesión] Cargar Sesión Activa',
  props<{ usuarioActivo: Usuario | undefined }>()
)