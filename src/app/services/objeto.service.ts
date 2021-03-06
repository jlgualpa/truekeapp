import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


const objetoUrl = `${environment.APP_HTTP}/api/objeto`;

const categoriasUrl = `${objetoUrl}/list/categorias`;
const estadosUrl = `${objetoUrl}/list/estados`;

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  constructor(private http: HttpClient) { }

  //URL OBJETO//
  registrarObjeto(data): Observable<any> {
    return this.http.post(objetoUrl, data);
  }

  buscarObjetos(): Observable<any> {
    return this.http.get(objetoUrl);
  }

  buscarObjetoId(id): Observable<any> {
    try {
      //const res= this.http.get(`${objetoUrl}/${id}`);
      return this.http.get(`${objetoUrl}/${id}`);
    } catch (error) {
      console.log('error servicio: ', error)
    }

    //return this.http.get(`${objetoUrl}/${id}`);

  }

  buscarObjetoIdUsuario(idUser): Observable<any> {
    return this.http.get(`${objetoUrl}/list/usuario?id_usuario=${idUser}`);
  }

  buscarObjetoIdCategoria(idCategoria): Observable<any> {
    return this.http.get(`${objetoUrl}/list/categoria?id_categoria=${idCategoria}`);
  }

  updateObjeto(id, data): Observable<any> {
    return this.http.put(`${objetoUrl}/${id}`, data);
  }

  deleteObjeto(id): Observable<any> {
    return this.http.delete(`${objetoUrl}/${id}`);
  }


  //URL CATEGORIA//
  buscarCategoria(): Observable<any> {
    return this.http.get(categoriasUrl);
  }

  //URL ESTADO//
  buscarEstado(): Observable<any> {
    return this.http.get(estadosUrl);
  }


}
