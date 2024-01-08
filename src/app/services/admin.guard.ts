// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAdmin) {
            return true;
        } else {
            // If not an admin, redirect to another route or show an access denied message
            this.router.navigate(['home']);
            return false;
        }
    }
}
