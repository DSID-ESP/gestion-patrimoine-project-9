import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-secteur-activite-details',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './secteur-activite-details.component.html',
  styleUrl: './secteur-activite-details.component.css'
})
export class SecteurActiviteDetailsComponent {

  afficherPopupDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<SecteurActiviteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public secteurActivite: SecteurActivite,
    private matDialog: MatDialog,
    private secteurActiviteService: SecteurActiviteService,
    private notificationService: NotificationService,

  ) {}


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  supprimerSecteurActivite(codeSecteurActivite: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: codeSecteurActivite,
          categorie: "secteurActivite",
          message: "Voulez-vous supprimer ce secteur activité?"
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
    this.clickButton('secteur-activite-form');
  }


  // --------------------------------------------------------------------------

  // pour executer modifierSecteurActivite
  public submitSecteurActiviteForm(): void {
    this.clickButton('secteur-activite-form')
  }

  public modifierSecteurActivite(SecteurActiviteForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.prestatairesService.createPrestatairesFormData(prestataireForm.value);

    // this.subscriptions.push(this.prestatairesService.ajouterPrestatairesRequestParam(formData).subscribe({
    //     next: (response: Prestataires) => {
    //       console.log(response);

    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2

    // SECTEUR ACTIVITE



    this.subscriptions.push(this.secteurActiviteService.modifierSecteurActivite(SecteurActiviteForm.value).subscribe({
        next: (response: SecteurActivite) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie d'un secteur activité`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }


}
