import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Prestataires } from '../model/prestataires.model';
import { PrestatairesSecteur } from '../model/prestataires-secteur.model';



@Injectable({
  providedIn: 'root'
})
export class PrestatairesSecteurService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listePrestatairesSecteur(): Observable<PrestatairesSecteur[]> {
    return this.httpClient.get<PrestatairesSecteur[]>(`${this.urlServeur}/PrestatairesSecteurs`, { withCredentials: true });
  }

  public ajouterPrestatairesSecteur(prestatairesSecteur: PrestatairesSecteur): Observable<PrestatairesSecteur> {
    return this.httpClient.post<PrestatairesSecteur>(`${this.urlServeur}/AjouterPrestatairesSecteur`, prestatairesSecteur, { withCredentials: true });
  }


  public modifierPrestatairesSecteur(prestatairesSecteur: PrestatairesSecteur): Observable<PrestatairesSecteur> {
    return this.httpClient.put<PrestatairesSecteur>(`${this.urlServeur}/ModifierPrestatairesSecteur`, prestatairesSecteur, { withCredentials: true });
  }


  public supprimerPrestatairesSecteurById(ninea: string, codeSecteurActivite: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerPrestatairesSecteurById/${ninea}/${codeSecteurActivite}`, { withCredentials: true });
  }

}
