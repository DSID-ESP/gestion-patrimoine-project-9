import { Agent } from "./agent.model";
import { BonPour } from "./bon-pour.model";
import { TypeObjet } from "./type-objet.model";


export class ArticleBonPour {


  public codeArticleBonPour: number;
  public identifiantBonPour: string;
  public libelleArticleBonPour: string;
  public quantiteDemandee: number;
  public codeTypeObjet: TypeObjet;
  public matriculeAgent: Agent;

  constructor(
    codeArticleBonPour = 0,
    identifiantBonPour = '',
    libelleArticleBonPour = '',
    quantiteDemandee = 0,
    codeTypeObjet = new TypeObjet(),
    matriculeAgent = new Agent()
  ) {
    this.codeArticleBonPour = codeArticleBonPour;
    this.identifiantBonPour = identifiantBonPour;
    this.libelleArticleBonPour = libelleArticleBonPour;
    this.quantiteDemandee = quantiteDemandee;
    this.codeTypeObjet = codeTypeObjet;
    this.matriculeAgent = matriculeAgent;
  }

}

