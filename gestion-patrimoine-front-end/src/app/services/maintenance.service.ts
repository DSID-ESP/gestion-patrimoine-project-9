import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { Maintenance } from '../model/maintenance';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }



  // RECHERCHER BONENTREE SANS DOUBLONS
  public searchMaintenanceListFilterDouble(term: string, listeMaintenances: Maintenance[]): Observable<Maintenance[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de bonEntrees en fonction du terme de recherche
    const filteredMaintenances: Maintenance[] = listeMaintenances.filter((maintenance) =>
      this.numberToString(maintenance.numeroSerie.numeroSerie).includes(term.toLowerCase()) || this.numberToString(maintenance.typeMaintenance).includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredMaintenances1: Maintenance[] = filteredMaintenances.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.numeroSerie.numeroSerie === item.numeroSerie.numeroSerie || t.typeMaintenance === item.typeMaintenance
      ))
    );

    return of(filteredMaintenances1);
  }

  // RECHERCHER Maintenance
  public searchMaintenanceList(term: string, listeMaintenances: Maintenance[]): Observable<Maintenance[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de Maintenance en fonction du terme de recherche
    const filteredMaintenances = listeMaintenances.filter((maintenance) =>
      this.doesMaintenanceMatchTerm(maintenance, term)
    );

    return of(filteredMaintenances);
  }

  private doesMaintenanceMatchTerm(maintenance: Maintenance, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du Maintenance
    const termLowerCase = term.toLowerCase();
    return (
      this.numberToString(maintenance.numeroSerie.numeroSerie).includes(termLowerCase) || this.numberToString(maintenance.typeMaintenance).includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }

  numberToString(terme: string | number): string {
    if (typeof terme === 'number') {
        return terme.toString().toLowerCase();
    }
    return terme.toLowerCase(); // assuming terme is already a string
  }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeMaintenances(): Observable<Maintenance[]> {
    return this.httpClient.get<Maintenance[]>(`${this.urlServeur}/Maintenances`, { withCredentials: true });
  }

  public ajouterMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.httpClient.post<Maintenance>(`${this.urlServeur}/AjouterMaintenance`, maintenance, { withCredentials: true });
  }


  public modifierMaintenance(maintenance: Maintenance): Observable<Maintenance> {
    return this.httpClient.put<Maintenance>(`${this.urlServeur}/ModifierMaintenance`, maintenance, { withCredentials: true });
  }

  public supprimerMaintenanceById(identifiantMaintenance: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerMaintenanceById/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererMaintenanceById(identifiantMaintenance: string): Observable<Maintenance> {
    return this.httpClient.get<Maintenance>(`${this.urlServeur}/RecupererMaintenanceById/${identifiantMaintenance}`, { withCredentials: true });
  }




  public formatterMyDate(myDate: MyDate): string {
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
