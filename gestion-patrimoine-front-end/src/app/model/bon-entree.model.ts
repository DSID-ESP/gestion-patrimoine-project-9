import { BordereauLivraison } from "./bordereau-livraison.model";
import { MyDate } from "./my-date.model";

export class BonEntree {

  public identifiantBE: string;
  public numeroBE: string;
  public dateBonEntree: MyDate;
  public identifiantBL: BordereauLivraison;
  public libelleBonEntree:string;
  public observationBonEntree:string;


  constructor(
    identifiantBE = '',
    numeroBE = '',
    dateBonEntree = new MyDate(),
    identifiantBL = new BordereauLivraison(),
    libelleBonEntree = '',
    observationBonEntree = '',

  ) {
    this.identifiantBE = identifiantBE;
    this.numeroBE = numeroBE;
    this.dateBonEntree = dateBonEntree;
    this.identifiantBL = identifiantBL;
    this.libelleBonEntree = libelleBonEntree;
    this.observationBonEntree = observationBonEntree;

  }

}
