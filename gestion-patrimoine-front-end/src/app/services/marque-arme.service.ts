import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { MarqueVehicule } from '../model/marque-vehicule.model';
import { MarqueArme } from '../model/marque-arme.model';


@Injectable({
  providedIn: 'root'
})
export class MarqueVehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeMarqueArmes(): Observable<MarqueArme[]> {
    return this.httpClient.get<MarqueArme[]>(`${this.urlServeur}/MarqueArmes`, { withCredentials: true });
  }

  public ajouterMarqueArme(marqueArme: MarqueArme): Observable<MarqueArme> {
    return this.httpClient.post<MarqueArme>(`${this.urlServeur}/AjouterMarqueArme`, marqueArme, { withCredentials: true });
  }

  public modifierMarqueArme(marqueArme: FormData): Observable<MarqueArme> {
    return this.httpClient.put<MarqueArme>(`${this.urlServeur}/ModifierMarqueArme`, marqueArme, { withCredentials: true });
  }

  public supprimerMarqueArmeById(codeMarqueArme: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerMarqueArmeById/${codeMarqueArme}`, { withCredentials: true });
  }


}
