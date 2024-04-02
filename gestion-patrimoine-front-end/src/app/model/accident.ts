import { UniteDouaniere } from "./unite-douaniere.model";
import { Sections } from "./sections.model";
import { MyDate } from "./my-date.model";

export class Accident {

  public identifiantMaintenance: string;
  public dateIncident: MyDate | string;
  public lieuIncident: string;
  public commentaireIncident: string;
  public nombreDeces: number;
  public nombreBlesse: number;



  constructor(
    identifiantMaintenance = '',
    dateIncident = new MyDate(),
    lieuIncident = '',
    commentaireIncident = '',
    nombreDeces = 0,
    nombreBlesse = 0
  ) {
    this.identifiantMaintenance = identifiantMaintenance;
    this.dateIncident = dateIncident;
    this.lieuIncident = lieuIncident;
    this.commentaireIncident = commentaireIncident;
    this.nombreDeces = nombreDeces;
    this.nombreBlesse = nombreBlesse;
  }


}
