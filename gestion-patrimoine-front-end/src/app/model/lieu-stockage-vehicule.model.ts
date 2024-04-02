
export class LieuStockageVehicule {

  public codeLieuVH: string;
  public libellleLieuVH: string;
  public nombreLimiteStockageVH: number;




  constructor(
    codeLieuVH = '',
    libellleLieuVH = '',
    nombreLimiteStockageVH = 0
  ) {
    this.codeLieuVH = codeLieuVH;
    this.libellleLieuVH = libellleLieuVH;
    this.nombreLimiteStockageVH = nombreLimiteStockageVH;

  }

}
