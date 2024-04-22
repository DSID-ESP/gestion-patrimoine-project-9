import { Piece } from "./piece";

export class ChangementPiece {

  public codeChangementPiece: number;
  public identifiantMaintenance: string;
  public identifiantPiece: Piece;
  public nombrePieces: number;



  constructor(
    codeChangementPiece = 0,
    identifiantMaintenance = '',
    identifiantPiece = new Piece(),
    nombrePieces = 0
  ) {
    this.codeChangementPiece = codeChangementPiece;
    this.identifiantMaintenance = identifiantMaintenance;
    this.identifiantPiece = identifiantPiece;
    this.nombrePieces = nombrePieces;
  }


}
