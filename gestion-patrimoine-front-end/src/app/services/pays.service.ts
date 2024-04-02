import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Pays } from '../model/pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listePays(): Observable<Pays[]> {
    return this.httpClient.get<Pays[]>(`${this.urlServeur}/Pays`, { withCredentials: true });
  }

  public ajouterPays(pays: Pays): Observable<Pays> {
    return this.httpClient.post<Pays>(`${this.urlServeur}/AjouterPays`, pays, { withCredentials: true });
  }

  public modifierPays(pays: Pays): Observable<Pays> {
    return this.httpClient.put<Pays>(`${this.urlServeur}/ModifierPays`, pays, { withCredentials: true });
  }

  public supprimerPaysById(codePays: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerPaysById/${codePays}`, { withCredentials: true });
  }


  public createBonEntreeFormData(pays: Pays): FormData {

    const formData = new FormData();

    formData.append('codePays', pays.codePays);
    formData.append('libellePays', pays.libellePays);

    return formData;
  }
}
