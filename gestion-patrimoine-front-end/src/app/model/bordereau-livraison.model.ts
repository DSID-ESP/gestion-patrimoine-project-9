import { Agent } from "./agent.model";
import { MyDate } from "./my-date.model";
import { Prestataires } from "./prestataires.model";
import { Sections } from "./sections.model";


export class BordereauLivraison {

  public identifiantBL: string;
  public numeroBL: string;
  public dateBL: MyDate;
  public descriptionBL: string;
  public lieuDeLivraison: string;
  public representantPrestataire: string;
  public codeSection: Sections;
  public conformiteBL: string;
  public matriculeAgent: Agent;
  public dateEnregistrement: MyDate;
  public ninea: Prestataires;


  constructor(
    identifiantBL: string = '',
    numeroBL: string = '',
    dateBL: MyDate = new MyDate(),
    descriptionBL: string = '',
    lieuDeLivraison: string = '',
    representantPrestataire: string = '',
    codeSection: Sections = new Sections(),
    conformiteBL: string = '',
    matriculeAgent: Agent = new Agent(),
    dateEnregistrement: MyDate = new MyDate(),
    ninea: Prestataires = new Prestataires()
  ) {
    this.identifiantBL = identifiantBL;
    this.numeroBL = numeroBL;
    this.dateBL = dateBL;
    this.descriptionBL = descriptionBL;
    this.lieuDeLivraison = lieuDeLivraison;
    this.representantPrestataire = representantPrestataire;
    this.codeSection = codeSection;
    this.conformiteBL = conformiteBL;
    this.matriculeAgent = matriculeAgent;
    this.dateEnregistrement = dateEnregistrement;
    this.ninea = ninea;
  }

}
