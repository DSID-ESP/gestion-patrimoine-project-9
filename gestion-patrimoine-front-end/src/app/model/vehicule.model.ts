import { Agent } from "./agent.model";
import { ArticleBonEntree } from "./article-bon-entree.model";
import { BonEntree } from "./bon-entree.model";
import { MyDate } from "./my-date.model";
import { MarqueVehicule } from "./marque-vehicule.model";
import { Pays } from "./pays.model";
import { TypeEnergie } from "./type-energie.model";
import { TypeVehicule } from "./type-vehicule.model";


export class Vehicule {

  public numeroSerie: string;
  public numeroImmatriculation: string;
  public codeArticleBonEntree: ArticleBonEntree;
  public codeMarque: MarqueVehicule;
  public codeTypeEnergie: TypeEnergie;
  public numeroCarteGrise: string;
  public codeTypeVehicule: TypeVehicule;
  public modele: string;
  public libelleEtatVehicule: string;
  public codePays: Pays;
  public dateMiseEnCirculation: MyDate;


  constructor(
    numeroSerie = '',
    numeroImmatriculation = '',
    codeArticleBonEntree = new ArticleBonEntree(),
    codeMarque = new MarqueVehicule(),
    codeTypeEnergie = new TypeEnergie(),
    numeroCarteGrise = '',
    codeTypeVehicule = new TypeVehicule(),
    modele = '',
    libelleEtatVehicule = '',
    codePays = new Pays(),
    dateMiseEnCirculation = new MyDate(),
  ) {
    this.numeroSerie = numeroSerie;
    this.numeroImmatriculation = numeroImmatriculation;
    this.codeArticleBonEntree = codeArticleBonEntree;
    this.codeMarque = codeMarque;
    this.codeTypeEnergie = codeTypeEnergie;
    this.numeroCarteGrise = numeroCarteGrise;
    this.codeTypeVehicule = codeTypeVehicule;
    this.modele = modele; 
    this.libelleEtatVehicule = libelleEtatVehicule; 
    this.codePays = codePays;
    this.dateMiseEnCirculation = dateMiseEnCirculation;
  }

}
