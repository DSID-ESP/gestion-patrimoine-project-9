import { Agent } from "./agent.model";
import { MyDate } from "./my-date.model";
import { Sections } from "./sections.model";
import { UniteDouaniere } from "./unite-douaniere.model";

export class BonPour {

  identifiantBonPour: string | null;
  descriptionBonPour: string;
  etatBonPour: string;
  codeSection: Sections;
  codeUniteDouaniere: UniteDouaniere;
  numeroCourrielOrigine: number;
  dateCourrielOrigine: MyDate | string | null;
  objectCourrielOrigine: string;
  matriculeAgent: Agent;
  dateEnregistrement: MyDate | string | null;
  numeroArriveBLM: number | null;
  numeroArriveDLF: number | null;
  numeroArriveSection: number | null;
  dateArriveBLM: MyDate | string | null;
  dateArriveDLF: MyDate | string | null;
  dateArriveSection: MyDate | string | null;
  observationBLM: string | null;
  observationDLF: string | null;
  observationSection: string | null;


  constructor(
    identifiantBonPour = '',
    descriptionBonPour = '',
    etatBonPour = '',
    codeSection = new Sections(),
    codeUniteDouaniere = new UniteDouaniere(),
    numeroCourrielOrigine = 0,
    dateCourrielOrigine = new MyDate(),
    objectCourrielOrigine = '',
    matriculeAgent = new Agent(),
    dateEnregistrement = new MyDate(),
    numeroArriveBLM = 0,
    numeroArriveDLF = 0,
    numeroArriveSection = 0,
    dateArriveBLM = new MyDate(),
    dateArriveDLF = new MyDate(),
    dateArriveSection = new MyDate(),
    observationBLM = '',
    observationDLF = '',
    observationSection = ''
  ) {
    this.identifiantBonPour = identifiantBonPour;
    this.descriptionBonPour = descriptionBonPour;
    this.etatBonPour = etatBonPour;
    this.codeSection = codeSection;
    this.codeUniteDouaniere = codeUniteDouaniere;
    this.numeroCourrielOrigine = numeroCourrielOrigine;
    this.dateCourrielOrigine = dateCourrielOrigine;
    this.objectCourrielOrigine = objectCourrielOrigine;
    this.matriculeAgent = matriculeAgent;
    this.dateEnregistrement = dateEnregistrement;
    this.numeroArriveBLM = numeroArriveBLM;
    this.numeroArriveDLF = numeroArriveDLF;
    this.numeroArriveSection = numeroArriveSection;
    this.dateArriveBLM = dateArriveBLM;
    this.dateArriveDLF = dateArriveDLF;
    this.dateArriveSection = dateArriveSection;
    this.observationBLM = observationBLM;
    this.observationDLF = observationDLF;
    this.observationSection = observationSection;



  }

}
