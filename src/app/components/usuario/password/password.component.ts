import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public idUser: string;
  public hide = true;
  public usuario: any;

  public usuarioPwd = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  public newFormUsuario = new FormGroup({
    usuarioPwd: this.usuarioPwd
  });

  constructor(private dialogRef: MatDialogRef<PasswordComponent>, private usuarioService: UsuarioService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    this.usuarioService.buscarUsuario(this.idUser)
      .subscribe(
        dataUser => {
          if (dataUser) {
            this.usuario = dataUser;
          }
        },
        error => {
          console.log(error);
        })
  }


  savePassword(): void {
    this.usuario.password = CryptoJS.AES.encrypt(this.usuarioPwd.value.trim(), 'PassTrueApp').toString();
    this.usuarioService.updateUsuario(this.idUser, this.usuario)
      .subscribe(
        response => {
        });
    this.dialogRef.close();
    this.toastr.success('Datos guardados', 'Contraseña Actualizada');
  }

  closeMe() {
    this.dialogRef.close();
  }

}
