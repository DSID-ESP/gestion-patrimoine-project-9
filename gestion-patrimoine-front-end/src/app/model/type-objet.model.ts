import { Sections } from "./sections.model";

export class TypeObjet {

  public codeTypeObjet: string;
  public libelleTypeObjet: string;
  public codeSection: Sections;

  constructor(
    codeTypeObjet = '',
    libelleTypeObjet = '',
    codeSection = new Sections()
  ) {
    this.codeTypeObjet = codeTypeObjet;
    this.libelleTypeObjet = libelleTypeObjet;
    this.codeSection = codeSection;
  }

}
