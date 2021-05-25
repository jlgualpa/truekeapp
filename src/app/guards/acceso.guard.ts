import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoGuard implements CanActivate {
  public idUser: string;
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.idUser = localStorage.getItem('idUser');
    if (this.idUser) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
