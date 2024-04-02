import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { ArticleBonEntree } from '../model/article-bon-entree.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleBonEntreeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}

  // ----------------------------------------------------------------------------
  // RECHERCHER ARTICLEBONENTREE SANS DOUBLONS
  public searchArticleBonEntreeListFilterDouble(term: string, listeArticleBonEntrees: ArticleBonEntree[]): Observable<ArticleBonEntree[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de articlebonEntrees en fonction du terme de recherche
    const filteredArticleBonEntrees = listeArticleBonEntrees.filter((articleBonEntree) =>
    articleBonEntree.codeArticleBonEntree.toString().includes(term.toLowerCase()) || articleBonEntree.libelleArticleBonEntree.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredArticleBonEntrees1: ArticleBonEntree[] = filteredArticleBonEntrees.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.libelleArticleBonEntree === item.libelleArticleBonEntree || t.codeArticleBonEntree === item.codeArticleBonEntree
      ))
    );

    return of(filteredArticleBonEntrees1);
  }

  // RECHERCHER ARTICLEBONENTREE
  public searchArticleBonEntreeList(term: string, listeArticleBonEntrees: ArticleBonEntree[]): Observable<ArticleBonEntree[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de BonEntree en fonction du terme de recherche
    const filteredArticleBonEntrees = listeArticleBonEntrees.filter((articleBonEntree) =>
      this.doesBonEntreeMatchTerm(articleBonEntree, term)
    );

    return of(filteredArticleBonEntrees);
  }

  private doesBonEntreeMatchTerm(articleBonEntree: ArticleBonEntree, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du bonEntree
    const termLowerCase = term.toLowerCase();
    return (
      articleBonEntree.codeArticleBonEntree.toString().includes(termLowerCase) || articleBonEntree.libelleArticleBonEntree.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  //  CRUD ARTICLEBONENTREE

  public listeArticleBonEntrees(): Observable<ArticleBonEntree[]> {
    return this.httpClient.get<ArticleBonEntree[]>(`${this.urlServeur}/ArticleBonEntrees`, { withCredentials: true });
  }

  public ajouterArticleBonEntree(articleBonEntree: ArticleBonEntree): Observable<ArticleBonEntree> {
    return this.httpClient.post<ArticleBonEntree>(`${this.urlServeur}/AjouterArticleBonEntree`, articleBonEntree, { withCredentials: true });
  }


  public modifierArticleBonEntree(formData: ArticleBonEntree): Observable<ArticleBonEntree> {
    return this.httpClient.put<ArticleBonEntree>(`${this.urlServeur}/ModifierArticleBonEntree`, formData, { withCredentials: true });
  }

  public supprimerArticleBonEntree(codeArticleBonEntree: number): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerArticleBonEntreeById/${codeArticleBonEntree}`, { withCredentials: true });
  }

  public recupererArticleBonEntreeById(codeArticleBonEntree: number, identifiantBonEntree: string): Observable<ArticleBonEntree> {
    return this.httpClient.get<ArticleBonEntree>(`${this.urlServeur}/RecupererArticleBonEntreeById/${codeArticleBonEntree}/${identifiantBonEntree}`, { withCredentials: true });
  }


}
// ----------------------------------------------------------------------------
