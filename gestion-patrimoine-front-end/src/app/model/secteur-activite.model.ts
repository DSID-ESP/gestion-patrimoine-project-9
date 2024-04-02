
export class SecteurActivite {

  public codeSecteurActivite: string;
  public libelleSecteurActivite: string;

  constructor(
    codeSecteurActivite: string = '',
    libelleSecteurActivite: string = '',
  ) {
    this.codeSecteurActivite = codeSecteurActivite;
    this.libelleSecteurActivite = libelleSecteurActivite;
  }

}
