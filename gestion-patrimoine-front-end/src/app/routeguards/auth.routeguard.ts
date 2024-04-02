import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Utilisateur } from '../model/utilisateur.model';

@Injectable()
export class AuthActivateRouteGuard  {

    utilisateur = null;
    
    constructor(private router: Router){

    }

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

        if(sessionStorage.getItem('userdetails')){
            this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails')!);
        }
        if(!this.utilisateur){
            this.router.navigate(['connexion']);
        }
        return this.utilisateur ? true : false;
    }

    // private isUserLoggedIn(): boolean {

    //     if (sessionStorage.getItem('Authorization')) {
    //       return true;
    //     }
    
    //     this.router.navigate(['/login']);
    //     this.notificationService.notify(NotificationType.ERROR, `You need to log in to access this page`);
    
    //     return false;
    //   }
    
}