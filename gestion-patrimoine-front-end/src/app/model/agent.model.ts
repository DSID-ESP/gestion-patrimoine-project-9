import { UniteDouaniere } from "./unite-douaniere.model";
import { Sections } from "./sections.model";

export class Agent {

  public matriculeAgent: string;
  public codeAgent: string;
  public nomAgent: string;
  public emailAgent: string;
  public prenomAgent: string;
  public codeSection: Sections;
  public codeUniteDouaniere: UniteDouaniere;
  public numeroTelephoneAgent: number;





  constructor(matriculeAgent?: string, codeAgent?: string, nomAgent?: string, prenomAgent?: string, numeroTelephoneAgent?: number, emailAgent?: string, codeUniteDouaniere?: UniteDouaniere, codeSection?: Sections) {
      this.matriculeAgent = matriculeAgent || '';
      this.codeAgent = codeAgent || '';
      this.nomAgent = nomAgent || '';
      this.emailAgent = emailAgent || '';
      this.prenomAgent = prenomAgent || '';
      this.codeSection = codeSection || new Sections();
      this.codeUniteDouaniere = codeUniteDouaniere || new UniteDouaniere();
      this.numeroTelephoneAgent = numeroTelephoneAgent || 0;


  }

}
