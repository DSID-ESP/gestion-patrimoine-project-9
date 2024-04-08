import { MyDate } from "./my-date.model";
import { FonctionAgent } from "./fonction-agent.model";
import { Agent } from "./agent.model";

export class Utilisateur {

  public utilisateurID: number | null;
  public userName: string;
  public joinDate: MyDate | null;
  public lastLoginDate: MyDate | null;
  public lastLoginDateDisplay: MyDate | null;
  public pwd: string | null;
  public active: boolean;
  public notLocked: boolean;
  // public authorities: Authorities[]; // authorities?: [] au constructeur
  public matriculeAgent: Agent;
  public codeFonctionAgent: FonctionAgent;    
  public statusCd: string;
  public statusMsg : string;
  public authStatus : string;


  constructor(
    utilisateurID?: number, userName?: string, joinDate?: MyDate,
    lastLoginDate?: MyDate, lastLoginDateDisplay?: MyDate, pwd?: string,
    active?: boolean, notLocked?: boolean, matriculeAgent?: Agent, codeFonctionAgent?: FonctionAgent,
    statusCd?: string, statusMsg?: string, authStatus?: string
  ) {
        this.utilisateurID = utilisateurID || null;
        this.userName = userName || '';
        this.joinDate = joinDate || null;
        this.lastLoginDate = lastLoginDate || null;
        this.lastLoginDateDisplay = lastLoginDateDisplay || null;
        this.pwd = pwd || '';
        this.active = active || false;
        this.notLocked = notLocked || false;
        // this.authorities = [];
        this.matriculeAgent = matriculeAgent || new Agent();
        this.codeFonctionAgent = codeFonctionAgent || new FonctionAgent();
        this.statusCd = statusCd || '';
        this.statusMsg = statusMsg || '';
        this.authStatus = authStatus || '';
  }

}
