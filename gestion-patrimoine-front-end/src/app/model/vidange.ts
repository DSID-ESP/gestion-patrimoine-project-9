import { UniteDouaniere } from "./unite-douaniere.model";
import { Sections } from "./sections.model";
import { MyDate } from "./my-date.model";
import { Huile } from "./huile";

export class Vidange {

  public identifiantMaintenance: string;
  public identifiantHuile: Huile;
  public quantite: number;



  constructor(
    identifiantMaintenance = '',
    identifiantHuile = new Huile(),
    quantite = 0
  ) {
    this.identifiantMaintenance = identifiantMaintenance;
    this.identifiantHuile = identifiantHuile;
    this.quantite = quantite;
  }


}
