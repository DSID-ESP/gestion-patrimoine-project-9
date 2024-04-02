import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BordereauLivraison } from '../model/bordereau-livraison.model';
import { DatePipe } from '@angular/common';
import { MyDate } from '../model/my-date.model';
import { Controle } from '../model/controle.model';
import { Vehicule } from '../model/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class BordereauLivraisonService {

  private urlServeur = environment.rooturl1;

  constructor(
    private httpClient: HttpClient
  ) {}


  public listeControles(): Observable<Controle[]> {
    return this.httpClient.get<Controle[]>(`${this.urlServeur}/Controles`, { withCredentials: true });
  }

  public ajouterControle(controle: Controle): Observable<Controle> {
    return this.httpClient.post<Controle>(`${this.urlServeur}/AjouterControle`, controle, { withCredentials: true });
  }

  // public ajouterBordereauLivraisonRequestParam(bordereauLivraison: BordereauLivraison): Observable<BordereauLivraison> {
  //   return this.httpClient.post<BordereauLivraison>(`${this.urlServeur}/AjouterRequestParamBordereauLivraison`, bordereauLivraison, { withCredentials: true });
  // }

  public modifierControle(controle: Controle): Observable<Controle> {
    return this.httpClient.put<Controle>(`${this.urlServeur}/ModifierControle`, controle, { withCredentials: true });
  }


  public supprimerControleById(numeroSerie: string, dateControle: MyDate): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerControleById/${numeroSerie}/${dateControle}`, { withCredentials: true });
  }





  public formatterMyDate(myDate: MyDate): string  {
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
