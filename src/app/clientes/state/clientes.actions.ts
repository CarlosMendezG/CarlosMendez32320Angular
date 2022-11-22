import { createAction, props } from "@ngrx/store";
import { Cliente } from "src/app/models/cliente";

export const clientesInicializar = createAction(
    '[Clientes] Inicializar Clientes'
);

export const clientesCargar = createAction(
    '[Clientes] Cargar Clientes',
    props<{ clientes: Cliente[] }>()
);

export const clientesCargarError = createAction(
    '[Clientes] Cargar Clientes Error',
    props<{ error: any }>()
);

export const clientesAgregar = createAction(
    '[Clientes] Agregar Clientes',
    props<{ cliente: Cliente }>()
);

export const clientesAgregarError = createAction(
    '[Clientes] Agregar Clientes Error',
    props<{ error: any }>()
);

export const clientesModificar = createAction(
    '[Clientes] Modificar Clientes',
    props<{ cliente: Cliente }>()
);

export const clientesModificarError = createAction(
    '[Clientes] Modificar Clientes Error',
    props<{ error: any }>()
);

export const clientesEliminar = createAction(
    '[Clientes] Eliminar Clientes',
    props<{ cliente: Cliente }>()
);

export const clientesEliminarError = createAction(
    '[Clientes] Eliminar Clientes Error',
    props<{ error: any }>()
);

export const clientesSeleccionar = createAction(
    '[Clientes] Seleccionar Clientes',
    props<{ seleccionado: number }>()
);

export const clientesObtenerSeleccionado = createAction(
    '[Clientes] Obtener Clientes',
    props<{ cliente: Cliente }>()
);