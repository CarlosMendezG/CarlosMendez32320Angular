import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ClientesService } from 'src/app/services/clientes.service';
import { loadClientes, loadClientesFailure, loadClientesSuccess } from './clientes.actions';

@Injectable()
export class ClienteEffects {

    constructor(
        private actions$: Actions,
        private clientesServicio: ClientesService
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadClientes), // escuchar la acción
            // tap( data => console.log("effect Tap", data) ),
            mergeMap( // llamar el servicio según la acción
                () => this.clientesServicio.obtenerClientesHttp()
                    .pipe(
                        // tap( data => console.log("ObtenerClientes desde el Effect", data) ), 
                        map(clientes => loadClientesSuccess({ clientes })),  // llama la acción de éxito y le pasa los valores
                        catchError((error: any) => of(loadClientesFailure({ error }))) // llama a la acción de error y pasa el mensaje
                    )
            )
        )
    );


}