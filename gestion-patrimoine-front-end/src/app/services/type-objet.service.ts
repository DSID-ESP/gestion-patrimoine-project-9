import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { TypeObjet } from '../model/type-objet.model';
import { Agent } from '../model/agent.model';



@Injectable({
  providedIn: 'root'
})
export class TypeObjetService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeTypeObjets(): Observable<TypeObjet[]> {
    return this.httpClient.get<TypeObjet[]>(`${this.urlServeur}/TypeObjets`, { withCredentials: true });
  }

  public ajouterTypeObjet(typeObjet: TypeObjet): Observable<TypeObjet> {
    return this.httpClient.post<TypeObjet>(`${this.urlServeur}/AjouterTypeObjet`, typeObjet, { withCredentials: true });
  }

  public ajouterTypeObjetRequestParam(typeObjet: TypeObjet): Observable<TypeObjet> {
    return this.httpClient.post<TypeObjet>(`${this.urlServeur}/AjouterRequestParamTypeObjet`, typeObjet, { withCredentials: true });
  }

  public modifierTypeObjet(typeObjet: FormData): Observable<TypeObjet> {
    return this.httpClient.put<TypeObjet>(`${this.urlServeur}/ModifierTypeObjet`, typeObjet, { withCredentials: true });
  }

  public supprimerTypeObjet(codeTypeObjet: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerTypeObjetByTypeObjetId/${codeTypeObjet}`, { withCredentials: true });
  }


}
