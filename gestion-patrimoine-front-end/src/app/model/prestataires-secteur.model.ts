import { Prestataires } from "./prestataires.model";
import { SecteurActivite } from "./secteur-activite.model";

export class PrestatairesSecteur {

  public ninea: Prestataires;
  public codeSecteurActivite: SecteurActivite;

  constructor(
    ninea: Prestataires = new Prestataires(),
    codeSecteurActivite: SecteurActivite = new SecteurActivite(),
  ) {
    this.ninea = ninea;
    this.codeSecteurActivite = codeSecteurActivite;
  }

}
