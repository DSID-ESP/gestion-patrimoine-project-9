import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { LieuStockageVehicule } from '../model/lieu-stockage-vehicule.model';





@Injectable({
  providedIn: 'root'
})
export class LieuStockageVehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeLieuStockageVehicules(): Observable<LieuStockageVehicule[]> {
    return this.httpClient.get<LieuStockageVehicule[]>(`${this.urlServeur}/LieuStockageVehicules`, { withCredentials: true });
  }

  public ajouterLieuStockageVehicule(lieuStockageVehicule: LieuStockageVehicule): Observable<LieuStockageVehicule> {
    return this.httpClient.post<LieuStockageVehicule>(`${this.urlServeur}/AjouterLieuStockageVehicule`, lieuStockageVehicule, { withCredentials: true });
  }


  public modifierLieuStockageVehicule(lieuStockageVehicule: LieuStockageVehicule): Observable<LieuStockageVehicule> {
    return this.httpClient.put<LieuStockageVehicule>(`${this.urlServeur}/ModifierLieuStockageVehicule`, lieuStockageVehicule, { withCredentials: true });
  }

  public supprimerLieuStockageVehicule(codeLieuVH: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerLieuStockageVehiculeById/${codeLieuVH}`, { withCredentials: true });
  }

}
