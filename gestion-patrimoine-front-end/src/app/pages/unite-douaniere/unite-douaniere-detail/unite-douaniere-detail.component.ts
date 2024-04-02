import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyDateService } from 'src/app/services/my-date.service';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { NotificationService } from 'src/app/services/notification.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';

@Component({
  selector: 'app-unite-douaniere-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './unite-douaniere-detail.component.html',
  styleUrl: './unite-douaniere-detail.component.css'
})
export class UniteDouaniereDetailComponent implements OnInit, OnDestroy  {


  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere = new TypeUniteDouaniere();


  afficherPopupDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<UniteDouaniereDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public uniteDouaniere: UniteDouaniere,
    private matDialog: MatDialog,
    private uniteDouaniereService: UniteDouaniereService,
    private notificationService: NotificationService,
    private typeUniteDouaniereService: TypeUniteDouaniereService,

  ) {}


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeTypeUniteDouanieres();
  }


  public listeTypeUniteDouanieres(): void {

    const subscription = this.typeUniteDouaniereService.listeTypeUniteDouanieres().subscribe({
      next: (response: TypeUniteDouaniere[]) => {
        this.typeUniteDouanieres = response;
        // console.log(this.prestataires);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  supprimerUniteDouaniere(codeUniteDouaniere: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: codeUniteDouaniere,
          categorie: "uniteDouaniere",
          message: "Voulez-vous supprimer ce Unité Douaniére?"
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

    this.submitUniteDouaniereForm();
   // this.clickButton('unite-douaniere-form');
  }


  // --------------------------------------------------------------------------

  // pour executer modifierSecteurActivite
  public submitUniteDouaniereForm(): void {
    this.clickButton('unite-douaniere-form')
  }

  public modifierUniteDouaniere(UniteDouaniereForm: NgForm): void {

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

    // UniteDouaniereForm.value.nombreArme = 15;
    // UniteDouaniereForm.value.nombreAutomobile = 50;
    // UniteDouaniereForm.value.nombreMateriel = 100;



   // prestataireForm.value.secteurActivite = this.secteurActivitesSelect;

    //UniteDouaniereForm.value.typeUniteDouaniere = this.typeUniteDouaniere;

    UniteDouaniereForm.value.codeTypeUniteDouaniere = this.typeUniteDouanieres.find(typeUniteDouaniere => typeUniteDouaniere.libelleTypeUniteDouaniere === UniteDouaniereForm.value.codeTypeUniteDouaniere);
    console.log(UniteDouaniereForm.value);
    this.subscriptions.push(this.uniteDouaniereService.modifierUniteDouaniere(UniteDouaniereForm.value).subscribe({
        next: (response: UniteDouaniere) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie d'une unité douaniérere`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }

  

}
