import { Component, OnInit } from '@angular/core';
import { RegistrarComponent } from 'src/app/components/usuario/registrar/registrar.component';
import { LoginComponent } from 'src/app/components/usuario/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuHeader: boolean;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('idUser')) {
      this.menuHeader = true;
    }
  }

  registrarUsuario(): void {
    const dialogRef = this.dialog.open(RegistrarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuHeader = result.login;
      }
    });
  }

  loginUsuario(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuHeader = result.login;
      }
    });
  }

  home() {
    this.router.navigate(['home']);
  }

  homeLogin() {
    this.router.navigate(['homelogin']);
  }

  perfil() {
    this.router.navigate(['perfil']);
  }

  publicaciones() {
    this.router.navigate(['publicaciones']);
  }

  intercambios() {
    this.router.navigate(['intercambios']);
  }

  salir() {
    localStorage.clear();
    this.menuHeader = false;
    this.router.navigate(['home']);
  }

}
