import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Huile } from '../model/huile';



@Injectable({
  providedIn: 'root'
})
export class HuileService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeHuiles(): Observable<Huile[]> {
    return this.httpClient.get<Huile[]>(`${this.urlServeur}/Huiles`, { withCredentials: true });
  }

  public ajouterHuile(Huile: Huile): Observable<Huile> {
    return this.httpClient.post<Huile>(`${this.urlServeur}/AjouterHuile`, Huile, { withCredentials: true });
  }

  public modifierHuile(Huile: Huile): Observable<Huile> {
    return this.httpClient.put<Huile>(`${this.urlServeur}/ModifierHuile`, Huile, { withCredentials: true });
  }

  public supprimerHuileById(identifiantHuile: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerHuileById/${identifiantHuile}`, { withCredentials: true });
  }


}
