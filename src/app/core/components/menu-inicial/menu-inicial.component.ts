import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-inicial',
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.scss']
})
export class MenuInicialComponent implements OnInit {

  constructor(
    private readonly _router: Router
  ) { }

  public ruta: string = "inicio";
  private obtenerRuta(url: string) {
    if (!url) {
      this.ruta = "inicio";
      return;
    }
    let rutas: string[] = url.split('/');
    if (rutas.length < 2 || !rutas[1]) {
      this.ruta = "inicio";
      return;
    }
    this.ruta = rutas[1];
  }


  ngOnInit(): void {
    this.obtenerRuta(this._router.url);
  }

}
