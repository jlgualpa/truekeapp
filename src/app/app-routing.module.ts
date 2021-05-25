import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePublicComponent } from './components/home/home-public/home-public.component';
import { HomeLoginComponent } from './components/home/home-login/home-login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ListPublicacionComponent } from './components/publicaciones/list-publicacion/list-publicacion.component';
import { DetailPublicacionComponent } from './components/publicaciones/detail-publicacion/detail-publicacion.component';
import { ProcesoIntercambioComponent } from './components/intercambios/proceso-intercambio/proceso-intercambio.component';
import { ListIntercambioComponent } from './components/intercambios/list-intercambio/list-intercambio.component';
import { AccesoGuard } from './guards/acceso.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePublicComponent },
  { path: 'homelogin', component: HomeLoginComponent, canActivate: [AccesoGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AccesoGuard] },
  { path: 'publicaciones', component: ListPublicacionComponent, canActivate: [AccesoGuard] },
  { path: 'publicaciones/:id', component: DetailPublicacionComponent, canActivate: [AccesoGuard] },
  { path: 'intercambio/:id', component: ProcesoIntercambioComponent, canActivate: [AccesoGuard] },
  { path: 'intercambios', component: ListIntercambioComponent, canActivate: [AccesoGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
