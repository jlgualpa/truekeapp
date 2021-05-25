import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ObjetoService } from 'src/app/services/objeto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IntercambioService } from 'src/app/services/intercambio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AddPublicacionComponent } from 'src/app/components/publicaciones/add-publicacion/add-publicacion.component';
import { DialogConfirmComponent } from "src/app/navigation/dialog-confirm/dialog-confirm.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-publicacion',
  templateUrl: './detail-publicacion.component.html',
  styleUrls: ['./detail-publicacion.component.css']
})

export class DetailPublicacionComponent implements OnInit {
  public idUser: string;
  public objeto: any;
  public propietario: boolean;
  base64Objeto;
  contactos: any;
  perfil: any;

  constructor(private objetoService: ObjetoService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
    private usuarioService: UsuarioService, private intercambioService: IntercambioService, private dialog: MatDialog, private toastr: ToastrService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    this.getObjeto();
  }

  getObjeto(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id objeto', id)
    this.objetoService.buscarObjetoId(id)
      .subscribe(data => {

        if (data.id_usuario === this.idUser) {
          this.propietario = true
        } else {
          this.propietario = false
        }

        console.log('objeto', data)
        this.base64Objeto = Object.values(data.imagen);
        data.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
        this.objeto = data

        this.usuarioService.buscarPerfil(data.id_usuario)
          .subscribe(
            dataPerfil => {
              if (dataPerfil) {
                this.base64Objeto = Object.values(dataPerfil.imagen)
                dataPerfil.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
                this.perfil = dataPerfil;
                this.contactos = dataPerfil.Contactos
              }
            },
            error => {
              console.log(error);
            })
      });
  }

  editPublicacion(): void {
    const dialogRef = this.dialog.open(AddPublicacionComponent, { data: { idObjeto: this.objeto.id } });
    dialogRef.afterClosed().subscribe(result => {
      this.getObjeto();
    });
  }

  deleteObjeto(id): void {
    this.dialog
      .open(DialogConfirmComponent, { data: `¿Desea eliminar la publicación?` })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.objetoService.deleteObjeto(id)
            .subscribe(
              data => {
                this.toastr.success('Publicación Eliminada', 'Correcto');
                this.router.navigate(['publicaciones']);
              },
              error => {
                console.log(error);
              })
        }
      });
  }

  empezarIntercambio(): void {
    this.dialog
      .open(DialogConfirmComponent, { data: `¿Desea empezar el proceso de intercambio?` })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          const intercambio = {
            id_objeto: this.objeto.id,
            id_usuario: this.idUser,
            id_estado: 3,
          };

          this.intercambioService.registrarIntercambio(intercambio)
            .subscribe(
              response => {
                const idIntercambio = response.id
                this.objeto.imagen = this.objeto.imagen.base64;
                this.objeto.disponible = false;
                this.objetoService.updateObjeto(this.objeto.id, this.objeto)
                  .subscribe(
                    response => {
                      this.toastr.success('Intercambio Empezado', 'Correcto');
                      this.router.navigate(['intercambio/', idIntercambio]);
                    });
              });
        }
      });
  }

  back() {
    this._location.back();
  }
}
