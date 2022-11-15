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
            ofType(loadClientes),
            mergeMap(
                () => this.clientesServicio.obtenerClientesHttp()
                    .pipe(
                        map(clientes => loadClientesSuccess({ clientes })),
                        catchError((error: any) => of(loadClientesFailure({ error })))
                    )
            )
        )
    );


}