import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import * as ClientesAcciones from  './clientes.actions'; 
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/models/cliente';

@Injectable()
export class ClienteEffects {

    constructor(
        private actions$: Actions,
        private clientesServicio: ClientesService
    ) { }

    cargarClientes$ = createEffect(
        () => { return this.actions$.pipe(
            ofType(ClientesAcciones.clientesInicializar),
            concatMap(() => this.clientesServicio.obtenerClientesHttp().pipe(                        
                    map((clientes: Cliente[]) => ClientesAcciones.clientesCargar({ clientes })),
                    catchError((error: any) => of(ClientesAcciones.clientesCargarError({ error }))) 
                )
            )
        )}
    );

    agregarClientes$ = createEffect(
        () => { return this.actions$.pipe(
            ofType(ClientesAcciones.clientesAgregar),            
            concatMap(( { cliente} ) => this.clientesServicio.agregarClienteHttp(cliente).pipe(                        
                    map((cliente: Cliente) => ClientesAcciones.clientesInicializar()),
                    catchError((error: any) => of(ClientesAcciones.clientesAgregarError({ error }))) 
                )
            )
        )}
    );

    modificarClientes$ = createEffect(
        () => { return this.actions$.pipe(
            ofType(ClientesAcciones.clientesEliminar),            
            concatMap(( { cliente} ) => this.clientesServicio.modificarClienteHttp(cliente).pipe(
                    map((cliente: Cliente) => ClientesAcciones.clientesInicializar()),
                    catchError((error: any) => of(ClientesAcciones.clientesModificarError({ error }))) 
                )
            )
        )}
    );

    eliminarClientes$ = createEffect(
        () => { return this.actions$.pipe(
            ofType(ClientesAcciones.clientesEliminar),            
            concatMap(( { cliente} ) => this.clientesServicio.eliminarClienteHttp(cliente.id).pipe(
                    map((cliente: Cliente) => ClientesAcciones.clientesInicializar()),
                    catchError((error: any) => of(ClientesAcciones.clientesEliminarError({ error }))) 
                )
            )
        )}
    );
}