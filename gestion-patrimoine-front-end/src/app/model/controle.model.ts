import { MyDate } from "./my-date.model";
import { Vehicule } from "./vehicule.model";

export class Controle {

  public numeroSerie: string;
  public dateControle: MyDate;
  public observationControle: string;

  constructor(
    numeroSerie = '',
    dateControle = new MyDate(),
    observationControle = ''
  ) {
    this.numeroSerie = numeroSerie;
    this.dateControle = dateControle;
    this.observationControle = observationControle;
  }

}
