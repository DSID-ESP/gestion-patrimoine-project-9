import { TypeUniteDouaniere } from "./type-unite-douaniere.model";

export class UniteDouaniere {

  public codeUniteDouaniere: string;
  public nomUniteDouaniere: string;
  public effectifUniteDouaniere: number;
  public nombreArme: number;
  public nombreAutomobile: number;
  public nombreMateriel: number;
  public codeTypeUniteDouaniere: TypeUniteDouaniere;


  constructor(
    codeUniteDouaniere = '',
    nomUniteDouaniere = '',
    effectifUniteDouaniere = 0,
    nombreArme = 0,
    nombreAutomobile = 0,
    nombreMateriel = 0,
    codeTypeUniteDouaniere = new TypeUniteDouaniere()
  ) {
    this.codeUniteDouaniere = codeUniteDouaniere;
    this.nomUniteDouaniere = nomUniteDouaniere;
    this.effectifUniteDouaniere = effectifUniteDouaniere;
    this.nombreArme = nombreArme;
    this.nombreAutomobile = nombreAutomobile;
    this.nombreMateriel = nombreMateriel;
    this.codeTypeUniteDouaniere = codeTypeUniteDouaniere;
  }

}
