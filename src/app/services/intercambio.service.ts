import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const intercambioUrl = `${environment.APP_HTTP}/api/intercambio`;
const mensajeUrl = `${intercambioUrl}/mensaje`;

@Injectable({
  providedIn: 'root'
})
export class IntercambioService {

  constructor(private http: HttpClient) { }

  //URL INTERCAMBIO//
  registrarIntercambio(data): Observable<any> {
    return this.http.post(intercambioUrl, data);
  }

  buscarIntercambioId(id): Observable<any> {
    return this.http.get(`${intercambioUrl}/${id}`);
  }

  buscarIntercambioIdObjeto(id): Observable<any> {
    return this.http.get(`${intercambioUrl}/objeto/${id}`);
  }

  buscarIntercambioIdUsuario(id): Observable<any> {
    return this.http.get(`${intercambioUrl}?id_usuario=${id}`);
  }

  buscarIntercambios(): Observable<any> {
    return this.http.get(`${intercambioUrl}/usuario/list`);
  }

  updateIntercambio(id, data): Observable<any> {
    return this.http.put(`${intercambioUrl}/${id}`, data);
  }


  /*URL MENSAJE*/
  registrarMensaje(data): Observable<any> {
    return this.http.post(mensajeUrl, data);
  }

  buscarMensaje(id): Observable<any> {
    return this.http.get(`${mensajeUrl}/list?id_intercambio=${id}`);
  }
}
