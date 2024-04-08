import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { MyDate } from 'src/app/model/my-date.model';
import { MyDateService } from 'src/app/services/my-date.service';
import { FonctionAgent } from 'src/app/model/fonction-agent.model';
import { FonctionAgentService } from 'src/app/services/fonction-agent.service';

@Component({
  selector: 'app-utilisateur-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './utilisateur-detail.component.html',
  styleUrl: './utilisateur-detail.component.css'
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy  {

  afficherPopupDetail: boolean = true;

  public fonctionAgents: FonctionAgent[] = [];
  public fonctionAgent: FonctionAgent = new FonctionAgent();

  // public authorities: Authorities[] = [];
  // public authority: Authorities = new Authorities();
  

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<UtilisateurDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public utilisateur: Utilisateur,
    private matDialog: MatDialog,
    private fonctionAgentService: FonctionAgentService,
    private utilisateurService: UtilisateurService,
    // private authorityService: AuthorityService,
    private notificationService: NotificationService,
    private myDateService: MyDateService
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeFonctionAgents();
  }
  

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeFonctionAgents(): void {

    const subscription = this.fonctionAgentService.listeFonctionAgents().subscribe({
      next: (response: FonctionAgent[]) => {
        this.fonctionAgents = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  supprimerUtilisateurById(matriculeAgent: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: matriculeAgent,
          categorie: "utilisateur",
          message: "Voulez-vous supprimer cet utilisateur?"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.popupFermer();
    });
  }

  popupFermer(): void {
    this.dialogRef.close();
  }

  myDateStringFormatter(date: MyDate | string | undefined): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

  popupModifier(): void {
    this.afficherPopupDetail = false;
  }

  PopupDetail(): void {
    this.afficherPopupDetail = true;
  }

  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('utilisateur-form');
  }


  // --------------------------------------------------------------------------

  // pour executer modifierUtilisateur
  public submitBonEntreeForm(): void {
    this.clickButton('utilisateur-form');
  }


  public modifierUtilisateur(UtilisateurForm: NgForm): void {

    // console.log(UtilisateurForm.value);

    let utilisateur1: Utilisateur = new Utilisateur();

    utilisateur1.codeFonctionAgent = this.fonctionAgents.find(fonctionAgent => fonctionAgent.libelleFonctionAgent === UtilisateurForm.value.codeFonctionAgent) ?? new FonctionAgent();
    // utilisateur1.authorities = [this.authorities.find(authority => authority.nameAuthority === UtilisateurForm.value.authorities) ?? new Authorities()];
    utilisateur1.userName = this.utilisateur.userName;
    utilisateur1.matriculeAgent = this.utilisateur.matriculeAgent;

    utilisateur1.active = !UtilisateurForm.value.active;
    utilisateur1.notLocked = !UtilisateurForm.value.notLocked;

    utilisateur1.joinDate = this.utilisateur.joinDate;
    utilisateur1.lastLoginDate = this.utilisateur.lastLoginDate;
    utilisateur1.lastLoginDateDisplay = this.utilisateur.lastLoginDateDisplay;

    utilisateur1.utilisateurID = this.utilisateur.utilisateurID;

    console.log(utilisateur1);
  
    this.subscriptions.push(this.utilisateurService.modifierUser(utilisateur1).subscribe({
        next: (response: Utilisateur) => {
          console.log(response);
          this.utilisateur = response;
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie de l'utilisateur`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }

}
