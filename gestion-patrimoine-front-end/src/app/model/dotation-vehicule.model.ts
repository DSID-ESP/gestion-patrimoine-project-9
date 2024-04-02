import { Agent } from "./agent.model";
import { ArticleBonSortie } from "./article-bon-sortie.model";
import { MyDate } from "./my-date.model";
import { Vehicule } from "./vehicule.model";

export class DotationVehicule {

  public identifiantDV: string;
  public numeroSerie: Vehicule;
  public dateDotation: MyDate | null;
  public matriculeAgent: Agent;
  public codeArticleBonSortie: ArticleBonSortie;


  constructor(
    identifiantDV: string = '',
    numeroSerie = new Vehicule(),
    dateDotation = new MyDate(),
    matriculeAgent = new Agent(),
    codeArticleBonSortie = new ArticleBonSortie()
  ) {
    this.identifiantDV = identifiantDV;
    this.numeroSerie = numeroSerie;
    this.dateDotation = dateDotation || null;
    this.matriculeAgent = matriculeAgent;
    this.codeArticleBonSortie = codeArticleBonSortie;
  }

}
