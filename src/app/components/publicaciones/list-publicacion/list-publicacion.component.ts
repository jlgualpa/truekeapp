import { Component, OnInit } from '@angular/core';
import { AddPublicacionComponent } from 'src/app/components/publicaciones/add-publicacion/add-publicacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ObjetoService } from 'src/app/services/objeto.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-list-publicacion',
  templateUrl: './list-publicacion.component.html',
  styleUrls: ['./list-publicacion.component.css']
})
export class ListPublicacionComponent implements OnInit {
  public objetos: any;
  public idUser: string;
  base64Objeto;

  constructor(private dialog: MatDialog, private objetoService: ObjetoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    this.getObjetos();
  }

  getObjetos(): void {
    this.objetoService.buscarObjetoIdUsuario(this.idUser).subscribe(
      dataObjetos => {
        for (let i = 0; i < dataObjetos.length; i++) {
          this.base64Objeto = Object.values(dataObjetos[i].imagen);
          dataObjetos[i].imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
        }
        this.objetos = dataObjetos;
      }
    );
  }

  addPublicacion(): void {
    const dialogRef = this.dialog.open(AddPublicacionComponent, { data: { idObjeto: 0 } });
    dialogRef.afterClosed().subscribe(result => {
      this.getObjetos();
    });

  }

}
