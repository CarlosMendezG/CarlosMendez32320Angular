import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-autenticacion-login',
  templateUrl: './autenticacion-login.component.html',
  styleUrls: ['./autenticacion-login.component.scss']
})
export class AutenticacionLoginComponent implements OnInit, OnDestroy {

  constructor(
    private sesionServicio: SesionService,
    private dialog: MatDialog,
    private router: Router
  ) {

  }

  public sesionSubscription!: Subscription;

  ngOnInit(): void {
    const logIn = this.dialog.open(LoginComponent, {
      data: '',
      width: '350px'
    });

    logIn.afterClosed().subscribe(result => {
      console.log(`LogIn cerrado en autenticacion/login, resultado: ${result}`);
      this.sesionSubscription = this.sesionServicio.obtenerSesion().subscribe(
        (resultado: Sesion) => {
          this.router.navigate(['inicio']);
        }, (err: Error) => {
          console.error(err);
          this.router.navigate(['autenticacion/nuevo']);
        }, () => {
          this.sesionSubscription.unsubscribe;
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.sesionSubscription) this.sesionSubscription.unsubscribe;
  }

}
