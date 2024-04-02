import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  utilisateur: Utilisateur = new Utilisateur();

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let httpHeaders = new HttpHeaders();
    if(sessionStorage.getItem('userdetails')){
      this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
    if(this.utilisateur && this.utilisateur.motDePasse && this.utilisateur.userName){
      httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(this.utilisateur.userName + ':' + this.utilisateur.motDePasse));
    }else {
      let authorization = sessionStorage.getItem('Authorization');
      if(authorization){
        httpHeaders = httpHeaders.append('Authorization', authorization); 
      }
    }
    let xsrf = sessionStorage.getItem('XSRF-TOKEN');
    if(xsrf){
      httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
    }
    httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
    const xhr = req.clone({
      headers: httpHeaders
    });
  return next.handle(xhr).pipe(tap(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['accueil']);
        }
      }));
  }
}