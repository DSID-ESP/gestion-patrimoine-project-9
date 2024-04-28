import { Injectable } from '@angular/core';
import { Utilisateur } from '../model/utilisateur.model';
import { FonctionUtilisateur } from '../enum/fonction-utilisateur.enum';

@Injectable({
  providedIn: 'root',
})
export class FonctionUtilisateurService {

  utilisateur = new Utilisateur();


  constructor() { }


  private getFonctionUtilisateur(): string {
    // return this.authenticationService.getUserFromLocalCache().role;

    if (sessionStorage.getItem('userdetails')) {
      this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails') || "");
    }

    return this.utilisateur.codeFonctionAgent.libelleFonctionAgent;
  }

  
  public get getUtilisateur(): Utilisateur {
    // return this.authenticationService.getUserFromLocalCache().role;

    if (sessionStorage.getItem('userdetails')) {
      this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails') || "");
    }

    return this.utilisateur;
  }

  
  public get tousPrivileges(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.ADMIN ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.CSA ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.ASA ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.CSG ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.ASG ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.CSM ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.ASM ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.BLM ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.DLF ||
          this.getFonctionUtilisateur() === FonctionUtilisateur.BAF;
  }

  // -------------------------------------------------------------------------------------------------------

  public get estBAF(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.BAF;
  }


  public get estDLF(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.DLF;
  }

  public get estBLM(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.BLM;
  }

  public get estSection(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.CSG || this.getFonctionUtilisateur() === FonctionUtilisateur.ASG;
  }


  // -----------------------------------------------------------------------------------------------------------

  public get bonPourAjouterInitial(): boolean {
    return this.bonPourAjouterDLF || this.getFonctionUtilisateur() === FonctionUtilisateur.BAF;
  }

  public get bonPourAjouterDLF(): boolean {
    return this.bonPourAjouterBLM || this.getFonctionUtilisateur() === FonctionUtilisateur.DLF;
  }

  public get bonPourAjouterBLM(): boolean {
    return this.bonPourAjouterSection || this.getFonctionUtilisateur() === FonctionUtilisateur.BLM;
  }

  public get bonPourAjouterSection(): boolean {
    return this.getFonctionUtilisateur() === FonctionUtilisateur.CSG || this.getFonctionUtilisateur() === FonctionUtilisateur.ASG;
  }


}