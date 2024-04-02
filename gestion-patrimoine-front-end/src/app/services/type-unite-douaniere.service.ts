import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { TypeUniteDouaniere } from '../model/type-unite-douaniere.model';


@Injectable({
  providedIn: 'root'
})
export class TypeUniteDouaniereService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  // RECHERCHER BONENTREE SANS DOUBLONS
  public searchTypeUniteDouaniereListFilterDouble(term: string, listeTypeUniteDouanieres: TypeUniteDouaniere[]): Observable<TypeUniteDouaniere[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de bonEntrees en fonction du terme de recherche
    const filteredTypeUniteDouanieres: TypeUniteDouaniere[] = listeTypeUniteDouanieres.filter((typeUniteDouaniere) =>
      typeUniteDouaniere.codeTypeUniteDouaniere.toString().includes(term.toLowerCase()) || typeUniteDouaniere.libelleTypeUniteDouaniere.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredTypeUniteDouanieres1: TypeUniteDouaniere[] = filteredTypeUniteDouanieres.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.libelleTypeUniteDouaniere === item.libelleTypeUniteDouaniere || t.codeTypeUniteDouaniere === item.codeTypeUniteDouaniere
      ))
    );

    return of(filteredTypeUniteDouanieres1);
  }

  // RECHERCHER TypeUniteDouaniere
  public searchTypeUniteDouaniereList(term: string, listeTypeUniteDouanieres: TypeUniteDouaniere[]): Observable<TypeUniteDouaniere[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de TypeUniteDouaniere en fonction du terme de recherche
    const filteredTypeUniteDouanieres = listeTypeUniteDouanieres.filter((typeUniteDouaniere) =>
      this.doesTypeUniteDouaniereMatchTerm(typeUniteDouaniere, term)
    );

    return of(filteredTypeUniteDouanieres);
  }

  private doesTypeUniteDouaniereMatchTerm(typeUniteDouaniere: TypeUniteDouaniere, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du TypeUniteDouaniere
    const termLowerCase = term.toLowerCase();
    return (
      typeUniteDouaniere.codeTypeUniteDouaniere.toString().includes(termLowerCase) || typeUniteDouaniere.libelleTypeUniteDouaniere.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }


  public listeTypeUniteDouanieres(): Observable<TypeUniteDouaniere[]> {
    return this.httpClient.get<TypeUniteDouaniere[]>(`${this.urlServeur}/TypeUniteDouanieres`, { withCredentials: true });
  }

  public ajouterTypeUniteDouaniere(typeUniteDouaniere: TypeUniteDouaniere): Observable<TypeUniteDouaniere> {
    return this.httpClient.post<TypeUniteDouaniere>(`${this.urlServeur}/AjouterTypeUniteDouaniere`, typeUniteDouaniere, { withCredentials: true });
  }

  public modifierTypeUniteDouaniere(typeUniteDouaniere: TypeUniteDouaniere): Observable<TypeUniteDouaniere> {
    return this.httpClient.put<TypeUniteDouaniere>(`${this.urlServeur}/ModifierTypeUniteDouaniere`, typeUniteDouaniere, { withCredentials: true });
  }

  public supprimerTypeUniteDouaniere(codeTypeUniteDouaniere: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerTypeUniteDouaniereById/${codeTypeUniteDouaniere}`, { withCredentials: true });
  }


}
