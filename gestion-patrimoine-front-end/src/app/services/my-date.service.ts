
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyDate } from '../model/my-date.model';

@Injectable({
  providedIn: 'root'
})
export class MyDateService {

  constructor(private datePipe: DatePipe) { }

  public formatterMyDate(myDate: MyDate): string {
    if (!myDate || !myDate.year || !myDate.month || !myDate.day) {
      return '';
    }

    const { year, month, day } = myDate;
    const date = new Date(year, month - 1, day);

    const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy', 'fr') || '';
    return formattedDate;
  }

  public formatterMyDateFromString(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy', 'fr') || '';
    return formattedDate;
  }





  public formatterStringToNgbDateStruct(dateString: string): NgbDateStruct  {
    // Date au format "2023-12-01"
    // const dateString = "2023-12-01";

    // Diviser la chaîne de date en parties (année, mois, jour)
    const dateParts = dateString.split('-');

    // Créer une nouvelle instance de NgbDateStruct
    const ngbDate: NgbDateStruct = {
      year: parseInt(dateParts[0], 10),  // Convertir l'année en nombre
      month: parseInt(dateParts[1], 10), // Convertir le mois en nombre
      day: parseInt(dateParts[2], 10)     // Convertir le jour en nombre
    };

    // Assigner la date convertie à modelDate1
    return ngbDate;
  }


  formatterNgbDateStructToString(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }

    // Crée un objet JavaScript Date à partir de NgbDateStruct
    const jsDate = new Date(date.year, date.month - 1, date.day);

    // Utilise DatePipe pour formater la date avec le mois complet
    return this.datePipe.transform(jsDate, 'dd MMMM yyyy') || '';
  }

}
