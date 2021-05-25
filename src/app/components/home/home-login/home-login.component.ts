import { Component, OnInit } from '@angular/core';
import { ObjetoService } from 'src/app/services/objeto.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as Fuse from 'fuse.js';


@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {
  public objetos: any;
  public categorias: any;
  base64Objeto;

  public options = {
    keys: ['nombre']
  }
  public fuse: any;

  constructor(private objetoService: ObjetoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getObjetos();
    this.objetoService.buscarCategoria().subscribe(response => {
      this.categorias = response;
    })
  }

  getObjetos(): void {
    this.objetoService.buscarObjetos().subscribe(
      dataObjetos => {
        for (let i = 0; i < dataObjetos.length; i++) {
          this.base64Objeto = Object.values(dataObjetos[i].imagen);
          dataObjetos[i].imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
        }
        this.objetos = dataObjetos;
        this.fuse = new Fuse(this.objetos, this.options);
      }
    );
  }

  getObjetosCategoria(id): void {
    this.objetoService.buscarObjetoIdCategoria(id).subscribe(
      dataObjetos => {
        for (let i = 0; i < dataObjetos.length; i++) {
          this.base64Objeto = Object.values(dataObjetos[i].imagen);
          dataObjetos[i].imagen = this.sanitizer.bypassSecurityTrustResourceUrl(String.fromCharCode(...this.base64Objeto[1]));
        }
        this.objetos = dataObjetos;
      }
    );
  }


  public search(evt: KeyboardEvent): void {
    const target = evt.target as HTMLInputElement;
    if (target.value === '') {
      this.getObjetos();
    } else {
      this.objetos = this.fuse.search(target.value);
    }

  }

}
