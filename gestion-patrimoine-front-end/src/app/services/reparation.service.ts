import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { Reparation } from '../model/reparation';

@Injectable({
  providedIn: 'root',
})
export class ReparationService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeReparations(): Observable<Reparation[]> {
    return this.httpClient.get<Reparation[]>(`${this.urlServeur}/Reparations`, { withCredentials: true });
  }

  public ajouterReparation(reparation: Reparation): Observable<Reparation> {
    return this.httpClient.post<Reparation>(`${this.urlServeur}/AjouterReparation`, reparation, { withCredentials: true });
  }


  public modifierReparation(reparation: Reparation): Observable<Reparation> {
    return this.httpClient.put<Reparation>(`${this.urlServeur}/ModifierReparation`, reparation, { withCredentials: true });
  }

  public supprimerReparationById(identifiantMaintenance: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerReparationById/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererReparationById(identifiantMaintenance: string): Observable<Reparation> {
    return this.httpClient.get<Reparation>(`${this.urlServeur}/RecupererReparationById/${identifiantMaintenance}`, { withCredentials: true });
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
