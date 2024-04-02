import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Prestataires } from 'src/app/model/prestataires.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';
import { PopupSecteurActiviteComponent } from 'src/app/composants/secteur-activite/popup-secteur-activite/popup-secteur-activite.component';

@Component({
  selector: 'app-prestataire-secteur-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './prestataire-secteur-ajouter.component.html',
  styleUrl: './prestataire-secteur-ajouter.component.css'
})
export class PrestataireSecteurAjouterComponent implements OnInit, OnDestroy {

  public secteurActivitesSelect: SecteurActivite[] = [];

  public secteurActivites: SecteurActivite[] = [];
  public secteurActivite: SecteurActivite = new SecteurActivite();

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrestataireSecteurAjouterComponent>,
    private secteurActiviteService: SecteurActiviteService,
    private prestatairesService: PrestatairesService,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeSecteurActivites();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeSecteurActivites(): void {

    const subscription = this.secteurActiviteService.listeSecteurActivites().subscribe({
      next: (response: SecteurActivite[]) => {
        this.secteurActivites = response;
        // console.log(this.secteurActivites);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('prestataire-form');
  }


  // --------------------------------------------------------------------------
  // pour executer ajouterPrestataire
  public submitBonEntreeForm(): void {
    this.clickButton('prestataire-form')
  }

  public ajouterPrestataire(prestataireForm: NgForm): void {

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
    prestataireForm.value.secteurActivite = this.secteurActivitesSelect;

    console.log(prestataireForm.value);

    this.subscriptions.push(this.prestatairesService.ajouterPrestataires(prestataireForm.value).subscribe({
        next: (response: Prestataires) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du prestataire`);
        },
        error: (errorResponse: HttpErrorResponse) => {
          // console.log(errorResponse);

          this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
    );
  }
  // --------------------------------------------------------------------------


  popupSecteurActivite(secteurActivites: SecteurActivite[], prestataires: Prestataires, secteurActivitesSelect?: SecteurActivite[]): void {
    const dialogRef = this.matDialog.open(
      PopupSecteurActiviteComponent,
      {
        width: '80%',
        // height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:  {
          secteurActivites: secteurActivites,
          prestataires: prestataires,
          secteurActivitesSelected: secteurActivitesSelect
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
      if (dialogRef.componentInstance instanceof PopupSecteurActiviteComponent) {
        this.secteurActivitesSelect = dialogRef.componentInstance.secteurActivitesSelect;
        // console.log(this.secteurActivitesSelect);
      }
      // ----------------------------------
      this.ngOnInit();
    });
  }


  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
