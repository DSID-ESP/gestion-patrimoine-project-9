import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { TypeVehicule } from '../model/type-vehicule.model';


@Injectable({
  providedIn: 'root'
})
export class TypeVehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeTypeVehicules(): Observable<TypeVehicule[]> {
    return this.httpClient.get<TypeVehicule[]>(`${this.urlServeur}/TypeVehicules`, { withCredentials: true });
  }

  public ajouterTypeVehicule(typeVehicule: TypeVehicule): Observable<TypeVehicule> {
    return this.httpClient.post<TypeVehicule>(`${this.urlServeur}/AjouterTypeVehicule`, typeVehicule, { withCredentials: true });
  }

  public modifierTypeVehicule(typeVehicule: TypeVehicule): Observable<TypeVehicule> {
    return this.httpClient.put<TypeVehicule>(`${this.urlServeur}/ModifierTypeVehicule`, typeVehicule, { withCredentials: true });
  }

  public supprimerTypeVehicule(codeTypeVehicule: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerTypeVehiculeByTypeVehiculeId/${codeTypeVehicule}`, { withCredentials: true });
  }

}
