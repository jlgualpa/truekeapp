import { Component, OnInit, Inject } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public usuario = {
    email: '',
    password: ''
  };

  public usuarioEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public usuarioPwd = new FormControl('', [
    Validators.required
  ]);

  public newFormUsuario = new FormGroup({
    usuarioEmail: this.usuarioEmail,
    usuarioPwd: this.usuarioPwd,
  });

  constructor(private dialogRef: MatDialogRef<LoginComponent>, private usuarioService: UsuarioService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginUsuario(): void {
    this.usuarioService.loginUsuario(this.usuario.email, this.usuario.password)
      .subscribe(
        data => {
          if (!data) {
            this.toastr.error('Email o Contraseña Incorrectos', 'Verificar Datos');
          } else {
            this.toastr.success('Bienvenido a Trueke App', 'Ingreso correcto');
            localStorage.setItem('idUser', data.id);
            this.router.navigate(['homelogin']);
            this.dialogRef.close({
              login: true
            });
          }
        },
        error => {
          console.log(error);
        });
  }

  closeMe() {
    this.dialogRef.close({ login: false });
  }

}
