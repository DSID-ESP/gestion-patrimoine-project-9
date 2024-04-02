import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { ChangementPiece } from '../model/changement-piece';

@Injectable({
  providedIn: 'root',
})
export class ChangementPieceService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) { }


  // ----------------------------------------------------------------------------
  //  CRUD BonDeSortie

  public listeChangementPieces(): Observable<ChangementPiece[]> {
    return this.httpClient.get<ChangementPiece[]>(`${this.urlServeur}/ChangementPieces`, { withCredentials: true });
  }

  public ajouterChangementPiece(changementPiece: ChangementPiece): Observable<ChangementPiece> {
    return this.httpClient.post<ChangementPiece>(`${this.urlServeur}/AjouterChangementPiece`, changementPiece, { withCredentials: true });
  }


  public modifierChangementPiece(changementPiece: ChangementPiece): Observable<ChangementPiece> {
    return this.httpClient.put<ChangementPiece>(`${this.urlServeur}/ModifierChangementPiece`, changementPiece, { withCredentials: true });
  }

  public supprimerChangementPieceById(codeChangementPiece: number, identifiantMaintenance: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerChangementPieceById/${codeChangementPiece}/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererChangementPieceById(codeChangementPiece: number, identifiantMaintenance: string): Observable<ChangementPiece> {
    return this.httpClient.get<ChangementPiece>(`${this.urlServeur}/RecupererChangementPieceById/${codeChangementPiece}/${identifiantMaintenance}`, { withCredentials: true });
  }

  public recupererChangementPieceByIdentifiantMaintenance(identifiantMaintenance: string): Observable<ChangementPiece[]> {
    return this.httpClient.get<ChangementPiece[]>(`${this.urlServeur}/recupererChangementPieceByIdentifiantMaintenance/${identifiantMaintenance}`, { withCredentials: true });
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
