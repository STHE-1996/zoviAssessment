import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = next.data['expectedRole'] as string;
    const role = localStorage.getItem('role');

    if (role === expectedRole) {
      return true;
    } else {
      // Redirect to not authorized page or some other page
      this.router.navigate(['/not-authorized']);
      return false;
    }
  }
}



