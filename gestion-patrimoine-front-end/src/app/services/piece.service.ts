import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Piece } from '../model/piece';


@Injectable({
  providedIn: 'root'
})
export class PieceService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listePieces(): Observable<Piece[]> {
    return this.httpClient.get<Piece[]>(`${this.urlServeur}/Pieces`, { withCredentials: true });
  }

  public ajouterPiece(Piece: Piece): Observable<Piece> {
    return this.httpClient.post<Piece>(`${this.urlServeur}/AjouterPiece`, Piece, { withCredentials: true });
  }

  public modifierPiece(Piece: Piece): Observable<Piece> {
    return this.httpClient.put<Piece>(`${this.urlServeur}/ModifierPiece`, Piece, { withCredentials: true });
  }

  public supprimerPieceById(identifiantPiece: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerPieceById/${identifiantPiece}`, { withCredentials: true });
  }


}
