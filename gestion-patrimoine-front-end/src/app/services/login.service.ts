import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Utilisateur } from "src/app/model/utilisateur.model";
import { Observable, Subject } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constants';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
    
  }

  validateLoginDetails(utilisateur: Utilisateur) {
    window.sessionStorage.setItem("userdetails", JSON.stringify(utilisateur));
    return this.http.get(environment.rooturl1 + AppConstants.LOGIN_API_URL, { observe: 'response', withCredentials: true });
  }

}
