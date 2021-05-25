import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordComponent } from 'src/app/components/usuario/password/password.component';
import { ContactoComponent } from 'src/app/components/usuario/contacto/contacto.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { imageDefault } from 'SRC/app/shared/image.const';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageSource;
  base64Objeto;
  base64String;
  contactos: any;
  tipoContacto: any;
  public base64Image: any;
  public idUser: string;
  public registroEmail: any;
  public registroFecha: any;

  public perfil = {
    id: '',
    nombres: '',
    apellidos: '',
    sexo: '',
    fecha_nacimiento: '',
    id_usuario: '',
    direccion: '',
    imagen: ''
  };

  public nombres = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]);
  public apellidos = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]);
  public sexo = new FormControl('', Validators.required);
  public fecha_nacimiento = new FormControl('');
  public id_usuario = new FormControl('');
  public direccion = new FormControl('', Validators.required);
  public imagen = new FormControl('');

  public perfilForm = new FormGroup({
    nombres: this.nombres,
    apellidos: this.apellidos,
    sexo: this.sexo,
    fecha_nacimiento: this.fecha_nacimiento,
    direccion: this.direccion,
    imagen: this.imagen,
  });

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')

    this.usuarioService.buscarUsuario(this.idUser)
      .subscribe(
        dataUser => {
          if (dataUser) {
            this.registroEmail = dataUser.email;
            this.registroFecha = dataUser.fecha_modificacion;
          }
        },
        error => {
          console.log(error);
        })

    this.getPerfil();
  }

  getPerfil(): void {
    if (this.idUser) {
      this.usuarioService.buscarPerfil(this.idUser)
        .subscribe(
          data => {
            if (data) {
              this.perfil = data;
              this.contactos = data.Contactos
              this.base64Objeto = Object.values(this.perfil.imagen)
              this.base64String = String.fromCharCode(...this.base64Objeto[1])
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64String);
            } else {
              this.toastr.error('Ingresar Datos Perfgil', 'Completar Datos');
            }
          },
          error => {
            console.log(error);
          })
    }
  }

  savePerfil(): void {
    if (this.base64Image) {
      this.perfil.imagen = this.base64Image;
      this.imageSource = this.base64Image;
    } else if (this.imageSource) {
      this.perfil.imagen = this.imageSource.base64;
    } else {
      this.perfil.imagen = imageDefault;
    }

    if (this.perfil.id) {
      this.usuarioService.updatePerfil(this.perfil.id, this.perfil)
        .subscribe(
          response => {
            this.toastr.success('Datos perfil guardados', 'Perfil Actualizado');
          });
    } else {
      const data = {
        nombres: this.perfil.nombres,
        apellidos: this.perfil.apellidos,
        sexo: this.perfil.sexo,
        fecha_nacimiento: this.perfil.fecha_nacimiento,
        id_usuario: this.idUser,
        direccion: this.perfil.direccion,
        imagen: this.perfil.imagen
      };
      this.usuarioService.registrarPerfil(data)
        .subscribe(
          response => {
            this.toastr.success('Datos perfil guardados', 'Perfil Creado');
            this.imageSource = this.perfil.imagen;
            this.getPerfil();
          });
    };

    this.imageChangedEvent = '';
  }

  updatePassword(): void {
    this.dialog.open(PasswordComponent);
  }

  columns: string[] = ['tipo', 'contacto'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  addContacto(): void {
    if (this.perfil.id) {
      const dialogRef = this.dialog.open(ContactoComponent, { data: { idPerfil: this.perfil.id } });
      dialogRef.afterClosed().subscribe(result => {
        this.usuarioService.buscarContacto(this.perfil.id).subscribe(
          data => {
            this.contactos = data;
          });

      });
    } else {
      this.toastr.error('Primero Guarde Perfil', 'Completar Datos');
    }
  }

  deleteContacto(id): void {
    this.usuarioService.deleteContacto(id)
      .subscribe(
        data => {
          this.toastr.success('Contacto Eliminado');
          this.usuarioService.buscarContacto(this.perfil.id).subscribe(
            data => {
              this.contactos = data;
            });
        },
        error => {
          console.log(error);
        })
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.base64Image = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    this.toastr.error('Seleccionar otra imagen', 'Imagen Inválida');
  }


}



