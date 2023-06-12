import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      if (next.routeConfig?.path === 'login') {
        if (token) {
          this.router.navigate(['']);
          return false;
        } else {
          return true;
        }
      }

      if (token) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
