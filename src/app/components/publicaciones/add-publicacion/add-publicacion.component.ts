import { Component, OnInit, Inject } from '@angular/core';
import { ObjetoService } from 'src/app/services/objeto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { imageDefault } from 'SRC/app/shared/image.const';

export interface DialogData {
  idObjeto: number;
}

@Component({
  selector: 'app-add-publicacion',
  templateUrl: './add-publicacion.component.html',
  styleUrls: ['./add-publicacion.component.css']
})
export class AddPublicacionComponent implements OnInit {

  public idUser: string;
  public categorias: any;
  public estados: any;
  public base64Image: any;
  base64Objeto;
  imageSource;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  public objeto = {
    id: '',
    nombre: '',
    descripcion: '',
    id_categoria: '',
    id_estado: '',
    imagen: ''
  };

  public objetoNombre = new FormControl('', Validators.required);
  public objetoDescripcion = new FormControl('', Validators.required);
  public objetoIdCategoria = new FormControl('', Validators.required);
  public objetoIdEstado = new FormControl('', Validators.required);

  public newFormObjeto = new FormGroup({
    objetoNombre: this.objetoNombre,
    objetoDescripcion: this.objetoDescripcion,
    objetoIdCategoria: this.objetoIdCategoria,
    objetoIdEstado: this.objetoIdEstado
  });

  constructor(private dialogRef: MatDialogRef<AddPublicacionComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private objetoService: ObjetoService, private router: Router, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');

    this.objetoService.buscarCategoria().subscribe(response => {
      this.categorias = response;
    })

    this.objetoService.buscarEstado().subscribe(response => {
      this.estados = response;
    })

    this.getObjeto();
  }

  getObjeto(): void {
    if (this.data.idObjeto) {
      this.objetoService.buscarObjetoId(this.data.idObjeto)
        .subscribe(
          dataObjeto => {
            if (dataObjeto) {
              this.objeto = dataObjeto;
              this.base64Objeto = Object.values(dataObjeto.imagen);
              this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
              dataObjeto.imagen = this.imageSource;
              this.objeto = dataObjeto;
            }
          },
          error => {
            console.log(error);
          })
    }
  }

  saveObjeto(): void {

    if (this.objeto.id) {

      if (this.base64Image) {
        this.objeto.imagen = this.base64Image;
      } else {
        this.objeto.imagen = this.imageSource.base64;
      }

      this.objetoService.updateObjeto(this.objeto.id, this.objeto)
        .subscribe(
          response => {
            this.dialogRef.close();
            this.toastr.success('Datos guardados', 'Publicacion Actualizada');
          });
    } else {

      if (!this.base64Image) {
        this.base64Image = imageDefault;
      }

      const data = {
        nombre: this.objeto.nombre,
        descripcion: this.objeto.descripcion,
        id_usuario: this.idUser,
        id_categoria: this.objeto.id_categoria,
        id_estado: this.objeto.id_estado,
        imagen: this.base64Image
      };
      this.objetoService.registrarObjeto(data)
        .subscribe(
          response => {
            this.dialogRef.close();
            this.toastr.success('Datos guardados', 'Publicación Creada');
          });

    };
  }

  closeMe() {
    this.dialogRef.close();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.base64Image = event.base64;
    console.log(this.base64Image);
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
