import { UniteDouaniere } from "./unite-douaniere.model";
import { Sections } from "./sections.model";
import { MyDate } from "./my-date.model";

export class Vidange {

  public identifiantMaintenance: string;
  public libelleHuile: string;
  public quantiteMiseVehicule: number;



  constructor(
    identifiantMaintenance = '',
    libelleHuile = '',
    quantiteMiseVehicule = 0
  ) {
    this.identifiantMaintenance = identifiantMaintenance;
    this.libelleHuile = libelleHuile;
    this.quantiteMiseVehicule = quantiteMiseVehicule;
  }


}
