import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { ArticleBonEntree } from '../model/article-bon-entree.model';
import { ArticleBonSortie } from '../model/article-bon-sortie.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ArticleBonSortieService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD ARTICLEBONSORTIE

  public listeArticleBonSorties(): Observable<ArticleBonSortie[]> {
    return this.httpClient.get<ArticleBonSortie[]>(`${this.urlServeur}/ArticleBonSorties`, { withCredentials: true });
  }

  public ajouterArticleBonSortie(articleBonSortie: ArticleBonSortie): Observable<ArticleBonSortie> {
    return this.httpClient.post<ArticleBonSortie>(`${this.urlServeur}/AjouterArticleBonSortie`, articleBonSortie, { withCredentials: true });
  }


  public modifierArticleBonSortie(articleBonSortie: ArticleBonSortie): Observable<ArticleBonSortie> {
    return this.httpClient.put<ArticleBonSortie>(`${this.urlServeur}/ModifierArticleBonSortie`, articleBonSortie, { withCredentials: true });
  }

  public supprimerArticleBonSortie(codeArticleBonSortie: number, identifiantBonSortie: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerArticleBonSortieById/${codeArticleBonSortie}/${identifiantBonSortie}`, { withCredentials: true });
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
