import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {
  public hide = true;
  public usuario = {
    email: '',
    password: ''
  };

  public usuarioEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  public usuarioPwd = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  public newFormUsuario = new FormGroup({
    usuarioEmail: this.usuarioEmail,
    usuarioPwd: this.usuarioPwd,
  });

  constructor(private dialogRef: MatDialogRef<RegistrarComponent>, private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  public registrarUsuario(): void {
    this.usuarioService.buscarEmail(this.usuario.email)
      .subscribe(
        data => {
          if (!data) {
            const data = {
              email: this.usuario.email,
              password: this.usuario.password
            };
            this.usuarioService.registrarUsuario(data)
              .subscribe(
                response => {
                  localStorage.setItem('idUser', response.id);
                  this.toastr.success('Bienvenido a Trueke App', 'Registro Realizado');
                  this.dialogRef.close({
                    login: true
                  });
                  this.router.navigate(['perfil']);
                });
          } else {
            this.toastr.error('El email se encuentra registrado', 'Verificar Datos');
          }
        });
  }

  closeMe() {
    this.dialogRef.close();
  }

}
