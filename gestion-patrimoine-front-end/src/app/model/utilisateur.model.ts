import { MyDate } from "./my-date.model";
import { Fonction } from "./fonction.model";
import { Authorities } from "./authorities.model";
import { Agent } from "./agent.model";

export class Utilisateur {

  public utilisateurID: number | null;
  public matriculeAgent: Agent;
  public userName: string;
  public joinDate: MyDate | null;
  public lastLoginDate: MyDate | null;
  public lastLoginDateDisplay: MyDate | null;
  public motDePasse: string | null;
  public active: boolean;
  public notLocked: boolean;
  public authorities: Authorities[];
  public codeFonction: Fonction;    
  public statusCd: string;
  public statusMsg : string;
  public authStatus : string;


  constructor(
    utilisateurID?: number, matriculeAgent?: Agent, userName?: string, joinDate?: MyDate,
    lastLoginDate?: MyDate, lastLoginDateDisplay?: MyDate, motDePasse?: string,
    active?: boolean, notLocked?: boolean, authorities?: [], codeFonction?: Fonction,
    statusCd?: string, statusMsg?: string, authStatus?: string
  ) {
        this.utilisateurID = utilisateurID || null;
        this.matriculeAgent = matriculeAgent || new Agent();
        this.userName = userName || '';
        this.joinDate = joinDate || null;
        this.lastLoginDate = lastLoginDate || null;
        this.lastLoginDateDisplay = lastLoginDateDisplay || null;
        this.motDePasse = motDePasse || '';
        this.active = active || false;
        this.notLocked = notLocked || false;
        this.authorities = [];
        this.codeFonction = codeFonction || new Fonction();
        this.statusCd = statusCd || '';
        this.statusMsg = statusMsg || '';
        this.authStatus = authStatus || '';
  }

}
