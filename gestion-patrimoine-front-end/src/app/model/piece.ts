
export class Piece {

  public identifiantPiece: string;
  public referencePiece: string;


  constructor(
    identifiantPiece = '',
    referencePiece = ''
  ) {
    this.identifiantPiece = identifiantPiece;
    this.referencePiece = referencePiece;
  }


}
