import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-clientes-menu',
  templateUrl: './clientes-menu.component.html',
  styleUrls: ['./clientes-menu.component.scss']
})
export class ClientesMenuComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {        
        if (!event.url) return;
        if (event.url == '/clientes') {
          this.seleccionarMenu(this.menuSeleccionado);
          return;
        };
        if (event.url.indexOf("/clientes/") < 0) return;
        this.seleccionarMenu(event.url);
      }
    });
  }

  @Input()
  public menuSeleccionado: string = "ListadoMatClientes";
  @Output()
  public menuClientesSeleccionado = new EventEmitter<string>();
  seleccionarMenu(nuevaSelección: string) {
    if (this.menuSeleccionado == nuevaSelección) return;
    switch (nuevaSelección) {
      case 'Clientes':
      case '/clientes/cliente':
      case 'ClientesCards':
      case '/clientes/cards':
      case 'ListadoClientes':
      case '/clientes/list':
      case 'Detalle':
      case '/clientes/detalle':
        this.menuSeleccionado = nuevaSelección;
        break;
      default:
        return;
    }
    this.menuClientesSeleccionado.emit(nuevaSelección);
  }

  @Input()
  public mostrarDatos: boolean = true;
  @Output()
  public mostrarDatosClientes = new EventEmitter<boolean>();
  mostrarDatosDeClientes() {
    this.mostrarDatosClientes.emit(this.mostrarDatos);
  }

  ngOnInit(): void {
  }

}
