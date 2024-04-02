import { MyDate } from "./my-date.model";

export class Reparation {

  public identifiantMaintenance: string;
  public natureReparation: string;
  public suiteAccident: boolean;


  constructor(
    identifiantMaintenance = '',
    natureReparation = '',
    suiteAccident = false
  ) {
    this.identifiantMaintenance = identifiantMaintenance;
    this.natureReparation = natureReparation;
    this.suiteAccident = suiteAccident;
  }


}
