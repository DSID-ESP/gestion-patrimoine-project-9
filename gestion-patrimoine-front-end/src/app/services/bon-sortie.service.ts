import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { BonSortie } from '../model/bon-sortie.model';

@Injectable({
  providedIn: 'root',
})
export class BonSortieService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeBonSorties(): Observable<BonSortie[]> {
    return this.httpClient.get<BonSortie[]>(`${this.urlServeur}/BonSorties`, { withCredentials: true });
  }

  public ajouterBonSortie(BonSortie: BonSortie): Observable<BonSortie> {
    return this.httpClient.post<BonSortie>(`${this.urlServeur}/AjouterBonSortie`, BonSortie, { withCredentials: true });
  }


  public modifierBonSortie(boSortie: BonSortie): Observable<BonSortie> {
    return this.httpClient.put<BonSortie>(`${this.urlServeur}/ModifierBonSortie`, BonSortie, { withCredentials: true });
  }

  public supprimerBonSortieById(identifiantBonSortie: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerBonSortieById/${identifiantBonSortie}`, { withCredentials: true });
  }

  public recupererBonSortieById(idIdentifiantBonSortie: string): Observable<BonSortie> {
    return this.httpClient.get<BonSortie>(`${this.urlServeur}/RecupererBonSortieById/${idIdentifiantBonSortie}`, { withCredentials: true });
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
