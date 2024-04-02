import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicule } from '../model/vehicule.model';

@Injectable({
  providedIn: 'root',
})
export class RechercherService {

  constructor() {}

  // ----------------------------------------------------------------------------
  // RECHERCHER SANS DOUBLONS
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






  public searchListFilterDouble<T>(term: string, liste: T[], prop1: keyof T, prop2: keyof T): Observable<T[]> {

    if (term.length <= 1) {
      return of([]);
    }

    const filteredList = liste.filter((item) =>
      (item[prop1] && this.convertToString(item[prop1]).includes(term.toLowerCase())) ||
      (item[prop2] && this.convertToString(item[prop2]).toLowerCase().includes(term.toLowerCase()))
    );

    const filteredListWithoutDuplicates: T[] = filteredList.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t[prop1] === item[prop1] || t[prop2] === item[prop2]
      ))
    );

    return of(filteredListWithoutDuplicates);
  }

  public searchList<T>(term: string, liste: T[], prop1: keyof T, prop2: keyof T): Observable<T[]> {
    if (term.length <= 1) {
      return of([]);
    }

    const filteredList = liste.filter((item) =>
      this.doesItemMatchTerm(item, term, prop1, prop2)
    );

    return of(filteredList);
  }

  private doesItemMatchTerm<T>(item: T, term: string, prop1: keyof T, prop2: keyof T): boolean {
    const termLowerCase = term.toLowerCase();
    return (
      (item[prop1] && this.convertToString(item[prop1]).includes(termLowerCase)) ||
      (item[prop2] && this.convertToString(item[prop2]).toLowerCase().includes(termLowerCase))
    );
  }

  private convertToString(value: any): string {
    return value != null ? String(value) : '';
  }

}

