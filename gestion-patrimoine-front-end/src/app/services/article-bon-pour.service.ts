import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { BonPour } from '../model/bon-pour.model';
import { ArticleBonPour } from '../model/article-bon-pour.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleBonPourService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }

  // ----------------------------------------------------------------------------
  // RECHERCHER BONENTREE SANS DOUBLONS
  // public searchArticleBonPourListFilterDouble(term: string, listeArticleBonPours: ArticleBonPour[]): Observable<ArticleBonPour[]> {

  //   if (term.length <= 1) {
  //     return of([]);
  //   }

  //   // Filtrer la liste de articleBonPours en fonction du terme de recherche
  //   const filteredArticleBonPours: ArticleBonPour[] = listeArticleBonPours.filter((articleBonPour) =>
  //     articleBonPour.identifiantBonPour.numeroCourrielOrigine.toString().includes(term.toLowerCase()) || articleBonPour.identifiantBonPour.etatBonPour.toLowerCase().includes(term.toLowerCase())
  //   );

  //   // Utilisation de la méthode filter() pour éliminer les doublons
  //   const filteredArticleBonPours1: ArticleBonPour[] = filteredArticleBonPours.filter((item, index, self) =>
  //     index === self.findIndex((t) => (
  //       t.libelleArticleBonPour === item.libelleArticleBonPour || t.identifiantBonPour.numeroCourrielOrigine === item.identifiantBonPour.numeroCourrielOrigine
  //     ))
  //   );

  //   return of(filteredArticleBonPours1);
  // }

  // // RECHERCHER ArticleBonPour
  // public searchArticleBonPourList(term: string, listeArticleBonPours: ArticleBonPour[]): Observable<ArticleBonPour[]> {
  //   if (term.length <= 1) {
  //     return of([]);
  //   }

  //   // Filtrer la liste de ArticleBonPour en fonction du terme de recherche
  //   const filteredArticleBonPours = listeArticleBonPours.filter((articleBonPour) =>
  //     this.doesArticleBonPourMatchTerm(articleBonPour, term)
  //   );

  //   return of(filteredArticleBonPours);
  // }

  // private doesArticleBonPourMatchTerm(articleBonPour: ArticleBonPour, term: string): boolean {
  //   // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du articleBonPour
  //   const termLowerCase = term.toLowerCase();
  //   return (
  //     articleBonPour.identifiantBonPour.numeroCourrielOrigine.toString().includes(termLowerCase) || articleBonPour.identifiantBonPour.identifiantBonPour.toLowerCase().includes(termLowerCase)
  //     // Ajoutez d'autres attributs à vérifier si nécessaire
  //   );
  // }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  //  CRUD ARTICLEBONPOUR

  public listeArticleBonPours(): Observable<ArticleBonPour[]> {
    return this.httpClient.get<ArticleBonPour[]>(`${this.urlServeur}/ArticleBonPours`, { withCredentials: true });
  }

  public ajouterArticleBonPour(articleBonPour: ArticleBonPour): Observable<ArticleBonPour> {
    return this.httpClient.post<ArticleBonPour>(`${this.urlServeur}/AjouterArticleBonPour`, articleBonPour, { withCredentials: true });
  }

  public modifierArticleBonPour(articleBonPour: ArticleBonPour): Observable<ArticleBonPour> {
    return this.httpClient.put<ArticleBonPour>(`${this.urlServeur}/ModifierArticleBonPour`, articleBonPour, { withCredentials: true });
  }

  public supprimerArticleBonPourById(codeArticleBonPour: number, identifiantBonPour: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerArticleBonPourById/${codeArticleBonPour}/${identifiantBonPour}`, { withCredentials: true });
  }

  public recupererArticleBonPourById(codeArticleBonPour: number,identifiantBonPour: string): Observable<ArticleBonPour> {
    return this.httpClient.get<ArticleBonPour>(`${this.urlServeur}/RecupererArticleBonPourById/${codeArticleBonPour}/${identifiantBonPour}`, { withCredentials: true });
  }

  public recupererTousArticleBonPourById(identifiantBonPour: string): Observable<ArticleBonPour[]> {
    return this.httpClient.get<ArticleBonPour[]>(`${this.urlServeur}/recupererTousArticleBonPourById/${identifiantBonPour}`, { withCredentials: true });
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
