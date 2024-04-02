import { UniteDouaniere } from "./unite-douaniere.model";

export class TypeEnergie {

  public codeTypeEnergie: string;
  public libelleTypeEnergie: string;
  public codeUniteDouaniere: UniteDouaniere;

  constructor(
    codeTypeEnergie = '',
    libelleTypeEnergie = '',
    codeUniteDouaniere = new UniteDouaniere()
  ) {
    this.codeTypeEnergie = codeTypeEnergie;
    this.libelleTypeEnergie = libelleTypeEnergie;
    this.codeUniteDouaniere = codeUniteDouaniere;
  }

}
