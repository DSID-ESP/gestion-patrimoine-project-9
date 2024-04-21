import { Agent } from "./agent.model";
import { MyDate } from "./my-date.model";
import { BonPour } from "./bon-pour.model";

export class BonSortie {

  public identifiantBonSortie: string;
  public numeroBonSortie: string;
  public descriptionBonSortie: string;
  public dateBonSortie: MyDate | null;
  public matriculeAgent: Agent;
  public identifiantBonPour: BonPour;


  constructor(
    identifiantBonSortie = '',
    numeroBonSortie = '',
    descriptionBonSortie = '',
    dateBonSortie = new MyDate(),
    matriculeAgent = new Agent(),
    identifiantBonPour = new BonPour()
  ) {
    this.identifiantBonSortie = identifiantBonSortie;
    this.numeroBonSortie = numeroBonSortie;
    this.descriptionBonSortie = descriptionBonSortie;
    this.dateBonSortie = dateBonSortie;
    this.matriculeAgent = matriculeAgent;
    this.identifiantBonPour = identifiantBonPour;
  }

}
