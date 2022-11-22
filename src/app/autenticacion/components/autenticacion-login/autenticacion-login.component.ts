import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { selectSesiónActiva } from 'src/app/core/state/sesion.selectors';
import { Sesión } from 'src/app/models/sesión';

@Component({
  selector: 'app-autenticacion-login',
  templateUrl: './autenticacion-login.component.html',
  styleUrls: ['./autenticacion-login.component.scss']
})
export class AutenticacionLoginComponent implements OnInit, OnDestroy {

  constructor(
    private storeSesión: Store<Sesión>,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.storeSesión.select(selectSesiónActiva).subscribe((sesión: Sesión) => {
      if (!sesión.activa || !sesión.usuario) {
        const logIn = this.dialog.open(LoginComponent, {
          data: '',
          width: '350px'
        });

        logIn.afterClosed().subscribe();
        return;      
      }
    });
  }

  ngOnDestroy(): void {
    
  }
}
