import { SecteurActivite } from "./secteur-activite.model";

export class Prestataires {

  public ninea: string;
  public adresseEmail: string;
  public numeroTelephone: number;
  public adresse: string;
  public raisonSociale: string;
  public secteurActivite: SecteurActivite[] = [];

  constructor(
    ninea: string = '',
    raisonSociale: string = '',
    numeroTelephone: number = 0,
    adresse: string = '',
    adresseEmail: string = '',
    secteurActivite: SecteurActivite[] = [],
  ) {
    this.ninea = ninea;
    this.raisonSociale = raisonSociale;
    this.numeroTelephone = numeroTelephone;
    this.adresse = adresse;
    this.adresseEmail = adresseEmail;
    this.secteurActivite = secteurActivite;
  }

}
