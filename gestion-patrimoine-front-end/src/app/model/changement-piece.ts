
export class ChangementPiece {

  public codeChangementPiece: number;
  public identifiantMaintenance: string;
  public nombrePiecesRechangees: number;
  public referencePieces: string;



  constructor(
    codeChangementPiece = 0,
    identifiantMaintenance = '',
    nombrePiecesRechangees = 0,
    referencePieces = ''
  ) {
    this.codeChangementPiece = codeChangementPiece;
    this.identifiantMaintenance = identifiantMaintenance;
    this.nombrePiecesRechangees = nombrePiecesRechangees;
    this.referencePieces = referencePieces;
  }


}
