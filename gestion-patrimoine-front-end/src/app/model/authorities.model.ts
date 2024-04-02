import { Utilisateur } from "./utilisateur.model";

export class Authorities {

  public codeAuthority: number;
  public nameAuthority: string;
  // public utilisateurID: Utilisateur;

  constructor(
    codeAuthority = 0,
    nameAuthority = '',
    // utilisateurID = new Utilisateur()
  ) {
    this.codeAuthority = codeAuthority;
    this.nameAuthority = nameAuthority;
    // this.utilisateurID = utilisateurID;
  }

}
