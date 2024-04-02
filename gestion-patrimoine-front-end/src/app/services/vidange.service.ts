import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { Vidange } from '../model/vidange';

@Injectable({
  providedIn: 'root',
})
export class VidangeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeVidanges(): Observable<Vidange[]> {
    return this.httpClient.get<Vidange[]>(`${this.urlServeur}/Vidanges`, { withCredentials: true });
  }

  public ajouterVidange(vidange: Vidange): Observable<Vidange> {
    return this.httpClient.post<Vidange>(`${this.urlServeur}/AjouterVidange`, vidange, { withCredentials: true });
  }


  public modifierVidange(vidange: Vidange): Observable<Vidange> {
    return this.httpClient.put<Vidange>(`${this.urlServeur}/ModifierVidange`, vidange, { withCredentials: true });
  }

  public supprimerVidangeById(identifiantMaintenance: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerVidangeById/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererVidangeById(identifiantMaintenance: string): Observable<Vidange> {
    return this.httpClient.get<Vidange>(`${this.urlServeur}/RecupererVidangeById/${identifiantMaintenance}`, { withCredentials: true });
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
