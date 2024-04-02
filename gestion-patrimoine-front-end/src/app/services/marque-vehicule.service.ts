import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { MarqueVehicule } from '../model/marque-vehicule.model';


@Injectable({
  providedIn: 'root'
})
export class MarqueVehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeMarqueVehicules(): Observable<MarqueVehicule[]> {
    return this.httpClient.get<MarqueVehicule[]>(`${this.urlServeur}/MarqueVehicules`, { withCredentials: true });
  }

  public ajouterMarqueVehicule(marqueVehicule: MarqueVehicule): Observable<MarqueVehicule> {
    return this.httpClient.post<MarqueVehicule>(`${this.urlServeur}/AjouterMarqueVehicule`, marqueVehicule, { withCredentials: true });
  }

  public modifierMarqueVehicule(marqueVehicule: FormData): Observable<MarqueVehicule> {
    return this.httpClient.put<MarqueVehicule>(`${this.urlServeur}/ModifierMarqueVehicule`, marqueVehicule, { withCredentials: true });
  }

  public supprimerMarqueVehicule(codeMarqueVH: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerMarqueVehiculeByMarqueVehiculeId/${codeMarqueVH}`, { withCredentials: true });
  }


}
