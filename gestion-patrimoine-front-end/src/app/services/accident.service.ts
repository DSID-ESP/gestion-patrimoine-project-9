import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { Accident } from '../model/accident';

@Injectable({
  providedIn: 'root',
})
export class AccidentService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeAccidents(): Observable<Accident[]> {
    return this.httpClient.get<Accident[]>(`${this.urlServeur}/Accidents`, { withCredentials: true });
  }

  public ajouterAccident(accident: Accident): Observable<Accident> {
    return this.httpClient.post<Accident>(`${this.urlServeur}/AjouterAccident`, accident, { withCredentials: true });
  }


  public modifierAccident(accident: Accident): Observable<Accident> {
    return this.httpClient.put<Accident>(`${this.urlServeur}/ModifierAccident`, accident, { withCredentials: true });
  }

  public supprimerAccidentById(identifiantMaintenance: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerAccidentById/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererAccidentById(identifiantMaintenance: string): Observable<Accident> {
    return this.httpClient.get<Accident>(`${this.urlServeur}/RecupererAccidentById/${identifiantMaintenance}`, { withCredentials: true });
  }




  public formatterMyDate(myDate: MyDate | string): string {
    
    if (typeof myDate === 'string') {
      return '';
    }

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
