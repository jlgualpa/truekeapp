import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntercambioService } from 'src/app/services/intercambio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ObjetoService } from 'src/app/services/objeto.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DialogConfirmComponent } from "src/app/navigation/dialog-confirm/dialog-confirm.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proceso-intercambio',
  templateUrl: './proceso-intercambio.component.html',
  styleUrls: ['./proceso-intercambio.component.css']
})
export class ProcesoIntercambioComponent implements OnInit {
  public idUser: string;
  public intercambio: any;
  public mensajes: any;
  base64Objeto;

  constructor(private route: ActivatedRoute, private intercambioService: IntercambioService, private usuarioService: UsuarioService, private objetoService: ObjetoService,
    private sanitizer: DomSanitizer, private _location: Location, private toastr: ToastrService, private dialog: MatDialog,) { }

  public mensaje = new FormControl('', [Validators.required]);
  public calificacion = new FormControl('', [Validators.required]);

  public newFormMensaje = new FormGroup({
    mensaje: this.mensaje
  });

  public newFormCalificacion = new FormGroup({
    calificacion: this.calificacion
  });

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    this.getIntercambio();
  }

  getIntercambio(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.intercambioService.buscarIntercambioId(id)
      .subscribe(data => {
        this.base64Objeto = Object.values(data.objeto.imagen)
        data.objeto.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
        this.intercambio = data;
        this.getMensajes(this.intercambio.id);
      });
  }

  registrarMensaje(): void {
    const data = {
      mensaje: this.mensaje.value,
      id_intercambio: this.intercambio.id,
      id_usuario: this.idUser,
    };
    this.intercambioService.registrarMensaje(data)
      .subscribe(
        response => {
          this.toastr.success('Mensaje Enviado');
          this.newFormMensaje.reset();
          this.getMensajes(this.intercambio.id);
        });
  }

  getMensajes(id): void {
    this.intercambioService.buscarMensaje(id).subscribe(
      data => {
        this.mensajes = data;
        for (let i = 0; i < this.mensajes.length; i++) {
          this.usuarioService.buscarPerfil(this.mensajes[i].id_usuario)
            .subscribe(
              perfil => {
                this.mensajes[i] = Object.assign(this.mensajes[i], perfil);
              })
        }
      });
  }


  back() {
    this._location.back();
  }

  columns: string[] = ['mensaje', 'usuario'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }


  cancelarIntercambio(): void {
    this.dialog
      .open(DialogConfirmComponent, { data: `¿Desea cancelar el intercambio?` })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          const intercambio = {
            id_estado: 5
          };

          this.intercambioService.updateIntercambio(this.intercambio.id, intercambio)
            .subscribe(
              response => {
              });

          this.intercambio.objeto.imagen = this.intercambio.objeto.imagen.base64;
          this.intercambio.objeto.disponible = true;
          this.objetoService.updateObjeto(this.intercambio.objeto.id, this.intercambio.objeto)
            .subscribe(
              response => {
              });

          this.toastr.success('Proceso Intercambio Cancelado');
          this._location.back();
        }
      });
  }


  realizarIntercambio(): void {
    this.dialog
      .open(DialogConfirmComponent, { data: `¿Desea realizar el intercambio?` })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {

          const intercambio = {
            id_estado: 4
          };

          this.intercambioService.updateIntercambio(this.intercambio.id, intercambio)
            .subscribe(
              response => {
                this.toastr.success('Calificar Intercambio', 'Intercambio Realizado');
                this.getIntercambio();
              });
        }
      });
  }


  calificar(): void {
    const intercambio = {
      calificado: true,
      puntaje: this.calificacion.value
    };

    this.intercambioService.updateIntercambio(this.intercambio.id, intercambio)
      .subscribe(
        response => {
          this.toastr.success('Calificación enviada');
          this.getIntercambio();
          this.newFormCalificacion.reset();
        });
  }

}
