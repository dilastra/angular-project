import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  public canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
