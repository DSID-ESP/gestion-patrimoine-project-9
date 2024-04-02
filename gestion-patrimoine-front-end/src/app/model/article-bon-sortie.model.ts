import { Agent } from "./agent.model";
import { BonSortie } from "./bon-sortie.model";
import { MyDate } from "./my-date.model";

export class ArticleBonSortie {


  public codeArticleBonSortie: number;
  public identifiantBonSortie: string;
  public libelleArticleBonSortie: string;
  public dateArticleBonSortie: MyDate | null;
  public quantiteAccordee: number;
  public matriculeAgent: Agent;


  constructor(
    codeArticleBonSortie = 0,
    identifiantBonSortie = '',
    libelleArticleBonSortie = '',
    dateArticleBonSortie = new MyDate(),
    quantiteAccordee = 0,
    matriculeAgent = new Agent()
  ) {
    this.codeArticleBonSortie = codeArticleBonSortie;
    this.identifiantBonSortie = identifiantBonSortie;
    this.libelleArticleBonSortie = libelleArticleBonSortie;
    this.dateArticleBonSortie = dateArticleBonSortie || null;
    this.quantiteAccordee = quantiteAccordee;
    this.matriculeAgent = matriculeAgent;
  }

}
