import { Agent } from "./agent.model";
import { MyDate } from "./my-date.model";
import { ArticleBonPour } from "./article-bon-pour.model";

export class BonSortie {

  public identifiantBonSortie: string;
  public numeroBonSortie: string;
  public descriptionBonSortie: string;
  public dateBonSortie: MyDate | null;
  public matriculeAgent: Agent;
  public codeArticleBonPour: ArticleBonPour;


  constructor(
    identifiantBonSortie = '',
    numeroBonSortie = '',
    descriptionBonSortie = '',
    dateBonSortie = new MyDate(),
    matriculeAgent = new Agent(),
    codeArticleBonPour = new ArticleBonPour()
  ) {
    this.identifiantBonSortie = identifiantBonSortie;
    this.numeroBonSortie = numeroBonSortie;
    this.descriptionBonSortie = descriptionBonSortie;
    this.dateBonSortie = dateBonSortie;
    this.matriculeAgent = matriculeAgent;
    this.codeArticleBonPour = codeArticleBonPour;
  }

}
