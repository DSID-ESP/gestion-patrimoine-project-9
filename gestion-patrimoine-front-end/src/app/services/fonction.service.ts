import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Fonction } from '../model/fonction.model';


@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


   // RECHERCHER Fonction SANS DOUBLONS
   public searchFonctionListFilterDouble(term: string, listeFonction: Fonction[]): Observable<Fonction[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de Fonction en fonction du terme de recherche
    const filteredFonction: Fonction[] = listeFonction.filter((fonction) =>
    fonction.codeFonction.toString().includes(term.toLowerCase()) || fonction.libelleFonction.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredFonction1: Fonction[] = filteredFonction.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.libelleFonction === item.libelleFonction || t.codeFonction === item.codeFonction
      ))
    );

    return of(filteredFonction1);
  }

  // RECHERCHER fonction
  public searchFonctionList(term: string, listeFonction: Fonction[]): Observable<Fonction[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de fonction en fonction du terme de recherche
    const filteredFonction = listeFonction.filter((fonction) =>
      this.doesFonctionMatchTerm(fonction, term)
    );

    return of(filteredFonction);
  }

  private doesFonctionMatchTerm(fonction: Fonction, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du
    const termLowerCase = term.toLowerCase();
    return (
      fonction.codeFonction.toString().includes(termLowerCase) || fonction.libelleFonction.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }




  public listeFonctions(): Observable<Fonction[]> {
    return this.httpClient.get<Fonction[]>(`${this.urlServeur}/Fonctions`, { withCredentials: true });
  }

  public ajouterFonctions(fonction: Fonction): Observable<Fonction> {
    return this.httpClient.post<Fonction>(`${this.urlServeur}/AjouterFonction`, fonction, { withCredentials: true });
  }

  public modifierFonction(fonction: FormData): Observable<Fonction> {
    return this.httpClient.put<Fonction>(`${this.urlServeur}/ModifierFonction`, fonction, { withCredentials: true });
  }

  public supprimerFonctionById(codeFonction: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerFonctionById/${codeFonction}`, { withCredentials: true });
  }


}
