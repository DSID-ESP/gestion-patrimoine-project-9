import { Agent } from "./agent.model";
import { BonEntree } from "./bon-entree.model";
import { MyDate } from "./my-date.model";
import { LieuStockageVehicule } from "./lieu-stockage-vehicule.model";
import { TypeObjet } from "./type-objet.model";

export class ArticleBonEntree {

  public codeArticleBonEntree: number;
  public identifiantBE: string;
  public libelleArticleBonEntree: string;
  public codeLieuVH: LieuStockageVehicule;
  public quantiteEntree: number;
  public codeTypeObjet: TypeObjet;
  public matriculeAgent: Agent;
  public dateEnregistrement: MyDate;

  
  constructor(
    codeArticleBonEntree = 0,
    identifiantBE = '',
    libelleArticleBonEntree = '',
    codeLieuVH = new LieuStockageVehicule(),
    quantiteEntree = 0,
    codeTypeObjet = new TypeObjet(),
    matriculeAgent = new Agent(),
    dateEnregistrement = new MyDate()
  ) {
    this.codeArticleBonEntree = codeArticleBonEntree;
    this.identifiantBE = identifiantBE;
    this.libelleArticleBonEntree = libelleArticleBonEntree;
    this.codeLieuVH = codeLieuVH;
    this.quantiteEntree = quantiteEntree;
    this.codeTypeObjet = codeTypeObjet;
    this.matriculeAgent = matriculeAgent;
    this.dateEnregistrement = dateEnregistrement;
  }

}

