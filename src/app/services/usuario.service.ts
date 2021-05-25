import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const userUrl = `${environment.APP_HTTP}/api/usuario`;
const perfilUrl = `${environment.APP_HTTP}/api/perfil`;
const loginUrl = `${userUrl}/login`;
const registrarUrl = `${userUrl}/registrar`;

const ContactoUrl = `${perfilUrl}/contacto`;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /*URL USUARIO*/
  registrarUsuario(data): Observable<any> {
    return this.http.post(registrarUrl, data);
  }

  loginUsuario(email, password): Observable<any> {
    return this.http.get(`${loginUrl}?email=${email}&password=${password}`);
  }

  buscarEmail(email): Observable<any> {
    return this.http.get(`${userUrl}?email=${email}`);
  }

  buscarUsuario(id): Observable<any> {
    return this.http.get(`${userUrl}/${id}`);
  }

  updateUsuario(id, data): Observable<any> {
    return this.http.put(`${userUrl}/${id}`, data);
  }

  /*URL PERFIL*/
  registrarPerfil(data): Observable<any> {
    return this.http.post(perfilUrl, data);
  }

  updatePerfil(id, data): Observable<any> {
    return this.http.put(`${perfilUrl}/${id}`, data);
  }

  buscarPerfil(idUser): Observable<any> {
    return this.http.get(`${perfilUrl}?id_usuario=${idUser}`);
  }

  /*URL CONTACTO*/
  registrarContacto(data): Observable<any> {
    return this.http.post(ContactoUrl, data);
  }

  deleteContacto(id): Observable<any> {
    return this.http.delete(`${ContactoUrl}/${id}`);
  }

  buscarContacto(id): Observable<any> {
    return this.http.get(`${ContactoUrl}/list?perfilId=${id}`);
  }

}
