import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Sesión } from 'src/app/models/sesión';
import { $tipoUsuario } from 'src/app/models/usuario';
import { selectSesiónActiva } from '../../state/sesion.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sesion: Sesión = { activa: false, usuario: undefined };
  public tiposUsuario = $tipoUsuario;

  constructor(
    private storeSesión: Store<Sesión>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeSesión.select(selectSesiónActiva).subscribe((sesión: Sesión) => {
      this.sesion = sesión;      
    });
  }

  ngOnDestroy(): void {
    
  }

}
