import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface tipoContacto {
  value: string;
  viewValue: string;
}

export interface DialogData {
  idPerfil: number;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public idPerfil: number;
  tipoContacto: tipoContacto[] = [
    { value: 'Celular', viewValue: 'Celular' },
    { value: 'Telefono', viewValue: 'Telefono Fijo' },
    { value: 'Facebook', viewValue: 'Facebook' },
    { value: 'Instagram', viewValue: 'Instagram' }
  ];

  public contactos = {
    contacto: '',
    perfilId: '',
    tipo: ''
  };

  public contacto = new FormControl('', [
    Validators.required
  ]);

  public tipo = new FormControl('', [
    Validators.required
  ]);

  public newFormContacto = new FormGroup({
    contacto: this.contacto,
    tipo: this.tipo
  });

  constructor(public dialogRef: MatDialogRef<ContactoComponent>, @Inject(MAT_DIALOG_DATA) public dataPerfil: DialogData, private usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.idPerfil = this.dataPerfil.idPerfil
  }

  registrarContacto(): void {
    const data = {
      contacto: this.contactos.contacto,
      perfilId: this.idPerfil,
      tipo: this.contactos.tipo
    };
    this.usuarioService.registrarContacto(data)
      .subscribe(
        response => {
          this.dialogRef.close();
          this.toastr.success('Datos guardados', 'Contacto Agregado');
        });
  }

  closeMe() {
    this.dialogRef.close();
    this.router.navigate(['perfil']);
  }

}
