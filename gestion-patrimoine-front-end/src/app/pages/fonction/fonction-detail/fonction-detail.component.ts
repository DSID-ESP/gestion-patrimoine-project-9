import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Fonction } from 'src/app/model/fonction.model';
import { FonctionService } from 'src/app/services/fonction.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-fonction-detail',
  // standalone: true,
  // imports: [],
  templateUrl: './fonction-detail.component.html',
  styleUrl: './fonction-detail.component.css'
})
export class FonctionDetailComponent {

  afficherPopupDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<FonctionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public fonction: Fonction,
    private matDialog: MatDialog,
    private fonctionService: FonctionService,
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


  supprimerFonction(codeFonction: string): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: codeFonction,
          categorie: "fonction",
          message: "Voulez-vous supprimer ce fonction?"
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
    this.clickButton('fonction-form');
  }


  // --------------------------------------------------------------------------

  // pour executer modifierFonction
  public submitAuthorityForm(): void {
    this.clickButton('fonction-form')
  }

  public modifierFonction(FonctionForm: NgForm): void {

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



    this.subscriptions.push(this.fonctionService.modifierFonction(FonctionForm.value).subscribe({
        next: (response: Fonction) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie d'une fonction`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }

}
