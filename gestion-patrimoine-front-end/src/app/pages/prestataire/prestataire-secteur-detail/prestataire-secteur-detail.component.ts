import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Prestataires } from 'src/app/model/prestataires.model';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { PopupSecteurActiviteComponent } from 'src/app/composants/secteur-activite/popup-secteur-activite/popup-secteur-activite.component';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';

@Component({
  selector: 'app-prestataire-secteur-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './prestataire-secteur-detail.component.html',
  styleUrl: './prestataire-secteur-detail.component.css'
})
export class PrestataireSecteurDetailComponent implements OnInit, OnDestroy {

  afficherPopupDetail: boolean = true;

  public secteurActivitesSelect: SecteurActivite[] = [];

  public secteurActivites: SecteurActivite[] = [];
  public secteurActivite: SecteurActivite = new SecteurActivite();

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();

  @ViewChild('dataPrestataire') dataPrestataire: any;
  @ViewChild('dataSecteurActivite') dataSecteurActivite: any;

  ngAfterViewInit() {
    // Vous pouvez maintenant accéder aux propriétés du composant enfant
    if (this.dataPrestataire) {
      // console.log(this.dataPrestataire.prestataire.ninea);
      this.prestataire = this.dataPrestataire.prestataire;
    }

    if (this.dataSecteurActivite) {
      // console.log(this.dataSecteurActivite.secteurActivites);
      // this.secteurActivites = this.dataPrestataire.prestataire.secteurActivite;
      this.secteurActivitesSelect = this.dataPrestataire.prestataire.secteurActivite;
    }

    this.cdr.detectChanges();
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PrestataireSecteurDetailComponent>,
    private secteurActiviteService: SecteurActiviteService,
    private prestatairesService: PrestatairesService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    // console.log(this.prestataire);
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
      }
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  supprimerPrestataireById(ninea: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: ninea,
          categorie: "prestataire",
          message: "Voulez-vous supprimer ce prestataire?"
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
    this.clickButton('prestataire-form');
  }


  // --------------------------------------------------------------------------

  // pour executer ajouterPrestataire
  public submitBonEntreeForm(): void {
    this.clickButton('prestataire-form')
  }

  public modifierPrestataire(prestataireForm: NgForm): void {

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


    this.subscriptions.push(this.prestatairesService.modifierPrestataires(prestataireForm.value).subscribe({
        next: (response: Prestataires) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie du prestataire`);
        },
        error: (errorResponse: HttpErrorResponse) => {

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
        this.prestataire.secteurActivite = this.secteurActivitesSelect;
      }
      // ----------------------------------
      this.ngOnInit();
    });
  }

}
