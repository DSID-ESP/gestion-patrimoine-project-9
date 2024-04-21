import { MyDate } from "./my-date.model";
import { Vehicule } from "./vehicule.model";

export class Maintenance {

  public identifiantMaintenance: string;
  public numeroSerie: Vehicule;
  public etatMaintenance: string;
  public dateDebutMaintenance: MyDate | null;
  public dateFinMaintenance: MyDate | null;
  public typeMaintenance: string;
  public observationMaintenance: string;


  constructor(
    identifiantMaintenance = '',
    numeroSerie = new Vehicule(),
    etatMaintenance = '',
    dateDebutMaintenance = new MyDate() || null,
    dateFinMaintenance = new MyDate() || null,
    typeMaintenance = '',
    observationMaintenance = ''
  ) {
    this.identifiantMaintenance = identifiantMaintenance;
    this.numeroSerie = numeroSerie;
    this.etatMaintenance = etatMaintenance;
    this.dateDebutMaintenance = dateDebutMaintenance;
    this.dateFinMaintenance = dateFinMaintenance;
    this.typeMaintenance = typeMaintenance;
    this.observationMaintenance = observationMaintenance;
  }


}
