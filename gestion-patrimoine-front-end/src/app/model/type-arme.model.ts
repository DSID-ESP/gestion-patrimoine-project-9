
export class TypeObjet {

  public codeTypeArme: string;
  public libelleTypeArme: string;

  constructor(
    codeTypeArme = '',
    libelleTypeArme = ''
  ) {
    this.codeTypeArme = codeTypeArme;
    this.libelleTypeArme = libelleTypeArme;
  }

}
