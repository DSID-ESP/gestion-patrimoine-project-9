import { Agent } from "./agent.model";
import { BonSortie } from "./bon-sortie.model";
import { MyDate } from "./my-date.model";

export class ArticleBonSortie {


  public codeArticleBonSortie: number;
  public identifiantBonSortie: string;
  public libelleArticleBonSortie: string;
  public dateArticleBonSortie: MyDate | null;
  public quantiteAccordeeSection: number | null;
  public quantiteAccordeeBLM: number | null;
  public quantiteAccordeeDLF: number | null;
  public quantiteAccordeeDefinitive: number | null;
  public matriculeAgent: Agent;


  constructor(
    codeArticleBonSortie = 0,
    identifiantBonSortie = '',
    libelleArticleBonSortie = '',
    dateArticleBonSortie = new MyDate(),
    quantiteAccordeeSection = 0,
    quantiteAccordeeBLM = 0,
    quantiteAccordeeDLF = 0,
    quantiteAccordeeDefinitive = 0,
    matriculeAgent = new Agent()
  ) {
    this.codeArticleBonSortie = codeArticleBonSortie;
    this.identifiantBonSortie = identifiantBonSortie;
    this.libelleArticleBonSortie = libelleArticleBonSortie;
    this.dateArticleBonSortie = dateArticleBonSortie || null;
    this.quantiteAccordeeSection = quantiteAccordeeSection || null;
    this.quantiteAccordeeBLM = quantiteAccordeeBLM || null;
    this.quantiteAccordeeDLF = quantiteAccordeeDLF || null;
    this.quantiteAccordeeDefinitive = quantiteAccordeeDefinitive || null;
    this.matriculeAgent = matriculeAgent;
  }

}
