import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Sections } from '../model/sections.model';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}

  // RECHERCHER BONENTREE SANS DOUBLONS
  public searchSectionsListFilterDouble(term: string, listeSections: Sections[]): Observable<Sections[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de bonEntrees en fonction du terme de recherche
    const filteredSections: Sections[] = listeSections.filter((section) =>
    section.codeSection.toString().includes(term.toLowerCase()) || section.libelleSection.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredSections1: Sections[] = filteredSections.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.libelleSection === item.libelleSection || t.codeSection === item.codeSection
      ))
    );

    return of(filteredSections1);
  }

  // RECHERCHER UniteDouaniere
  public searchSectionsList(term: string, listeSections: Sections[]): Observable<Sections[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de UniteDouaniere en fonction du terme de recherche
    const filteredSections = listeSections.filter((section) =>
      this.doesUniteDouaniereMatchTerm(section, term)
    );

    return of(filteredSections);
  }

  private doesUniteDouaniereMatchTerm(section: Sections, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du uniteDouaniere
    const termLowerCase = term.toLowerCase();
    return (
      section.codeSection.toString().includes(termLowerCase) || section.libelleSection.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }


  public listeSections(): Observable<Sections[]> {
    return this.httpClient.get<Sections[]>(`${this.urlServeur}/Sections`, { withCredentials: true });
  }

  public ajouterSections(formData: FormData): Observable<Sections> {
    return this.httpClient.post<Sections>(`${this.urlServeur}/AjouterSections`, formData, { withCredentials: true });
  }

  public modifierSections(formData: FormData): Observable<Sections> {
    return this.httpClient.put<Sections>(`${this.urlServeur}/ModifierSections`, formData, { withCredentials: true });
  }

  public supprimerSections(codeSection: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerSectionsById/${codeSection}`, { withCredentials: true });
  }


}
