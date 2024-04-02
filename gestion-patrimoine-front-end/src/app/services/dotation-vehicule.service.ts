import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { BonEntree } from '../model/bon-entree.model';
import { MyDate } from '../model/my-date.model';
import { DatePipe } from '@angular/common';
import { DotationVehicule } from '../model/dotation-vehicule.model';
import { Vehicule } from '../model/vehicule.model';

@Injectable({
  providedIn: 'root',
})
export class DotationVehiculeService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}

  // ----------------------------------------------------------------------------
  //  CRUD DOTATIONVEHICULE

  public listeDotationVehicules(): Observable<DotationVehicule[]> {
    return this.httpClient.get<DotationVehicule[]>(`${this.urlServeur}/DotationVehicules`);
  }

  public ajouterDotationVehicule(dotationVehicule: DotationVehicule): Observable<DotationVehicule> {
    return this.httpClient.post<DotationVehicule>(`${this.urlServeur}/AjouterDotationVehicule`, dotationVehicule);
  }


  public modifierDotationVehicule(dotationVehicule: DotationVehicule): Observable<DotationVehicule> {
    return this.httpClient.put<DotationVehicule>(`${this.urlServeur}/ModifierDotationVehicule`, dotationVehicule);
  }

  public supprimerDotationVehiculeById(identifiantDV: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerDotationVehiculeById/${identifiantDV}`);
  }

  public recupererDotationVehiculeById(identifiantDV: string): Observable<DotationVehicule> {
    return this.httpClient.get<DotationVehicule>(`${this.urlServeur}/RecupererDotationVehiculeById/${identifiantDV}`);
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
// ----------------------------------------------------------------------------
