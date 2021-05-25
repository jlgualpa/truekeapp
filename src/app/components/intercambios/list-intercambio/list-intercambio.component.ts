import { Component, OnInit } from '@angular/core';
import { IntercambioService } from 'src/app/services/intercambio.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-intercambio',
  templateUrl: './list-intercambio.component.html',
  styleUrls: ['./list-intercambio.component.css']
})
export class ListIntercambioComponent implements OnInit {
  public intercambioSeleccionado: any = [];
  public intercambioPublicado: any = [];
  public idUser: string;
  base64Objeto;
  constructor(private intercambioService: IntercambioService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    this.getIntercambios();
  }

  getIntercambios(): void {
    this.intercambioService.buscarIntercambios().subscribe(
      dataIntercambio => {
        for (let i = 0; i < dataIntercambio.length; i++) {
          this.base64Objeto = Object.values(dataIntercambio[i].objeto.imagen);
          dataIntercambio[i].objeto.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
          if (dataIntercambio[i].id_usuario === this.idUser) {
            this.intercambioSeleccionado.push(dataIntercambio[i])
          } else if (dataIntercambio[i].objeto.id_usuario === this.idUser) {
            this.intercambioPublicado.push(dataIntercambio[i])
          }

        }
      }
    );
  }

}
