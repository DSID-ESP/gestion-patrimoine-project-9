import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { TypeEnergie } from '../model/type-energie.model';



@Injectable({
  providedIn: 'root'
})
export class TypeEnergieService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeTypeEnergies(): Observable<TypeEnergie[]> {
    return this.httpClient.get<TypeEnergie[]>(`${this.urlServeur}/TypeEnergies`, { withCredentials: true });
  }

  public ajouterTypeEnergie(typeEnergie: TypeEnergie): Observable<TypeEnergie> {
    return this.httpClient.post<TypeEnergie>(`${this.urlServeur}/AjouterTypeEnergie`, typeEnergie, { withCredentials: true });
  }

  public modifierTypeEnergie(typeEnergie: TypeEnergie): Observable<TypeEnergie> {
    return this.httpClient.put<TypeEnergie>(`${this.urlServeur}/ModifierTypeEnergie`, typeEnergie, { withCredentials: true });
  }

  public supprimerTypeEnergie(codeTypeEnergie: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerSectionsById/${codeTypeEnergie}`, { withCredentials: true });
  }

}
