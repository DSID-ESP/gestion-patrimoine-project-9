import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicule } from '../model/vehicule.model';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}

  // ----------------------------------------------------------------------------
  // RECHERCHER VEHICULE SANS DOUBLONS
  public searchVehiculeListFilterDouble(term: string, listeVehicules: Vehicule[]): Observable<Vehicule[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicules = listeVehicules.filter((vehicule) =>
      vehicule.numeroSerie.toString().includes(term.toLowerCase()) || vehicule.modele.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredVehicules1: Vehicule[] = filteredVehicules.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.modele === item.modele || t.numeroSerie === item.numeroSerie
      ))
    );

    return of(filteredVehicules1);
  }

  // RECHERCHER VEHICULE
  public searchVehiculeList(term: string, listeVehicules: Vehicule[]): Observable<Vehicule[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de vehicule en fonction du terme de recherche
    const filteredVehicules = listeVehicules.filter((vehicule) =>
      this.doesVehiculeMatchTerm(vehicule, term)
    );

    return of(filteredVehicules);
  }

  private doesVehiculeMatchTerm(vehicule: Vehicule, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du vehicule
    const termLowerCase = term.toLowerCase();
    return (
      vehicule.numeroSerie.toString().includes(termLowerCase) || vehicule.modele.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  //  CRUD VEHICULE

  public listeVehicules(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.urlServeur}/Vehicules`, { withCredentials: true });
  }

  public ajouterVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.httpClient.post<Vehicule>(`${this.urlServeur}/AjouterVehicule`, vehicule, { withCredentials: true });
  }


  public modifierVehicule(formData: FormData): Observable<Vehicule> {
    return this.httpClient.put<Vehicule>(`${this.urlServeur}/ModifierVehicule`, formData, { withCredentials: true });
  }

  public supprimerVehiculeById(numeroSerie: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerVehiculeById/${numeroSerie}`, { withCredentials: true });
  }

  



  public formatterMyDate(myDate: MyDate): string  {
    if (!myDate || !myDate.year || !myDate.month || !myDate.day) {
        return '';
    }

    const { year, month, day } = myDate;
    const date = new Date(year, month - 1, day);

    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-dd') || '';
    return formattedDate;
  }


}
// ----------------------------------------------------------------------------
