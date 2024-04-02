import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Section } from 'jspdf-autotable';
import { Sections } from 'src/app/model/sections.model';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { NgForm } from '@angular/forms';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { SectionsService } from 'src/app/services/sections.service';

@Component({
  selector: 'app-sections-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './sections-detail.component.html',
  styleUrl: './sections-detail.component.css'
})
export class SectionsDetailComponent implements OnInit, OnDestroy {

  afficherPopupDetail: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<SectionsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public section: Sections,
    private matDialog: MatDialog,
    private sectionsService: SectionsService,
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


  supprimerSections(codeSection: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: codeSection,
          categorie: "section",
          message: "Voulez-vous supprimer cette section?"
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
    this.clickButton('section-form');
  }


  // --------------------------------------------------------------------------

  // pour executer ajouterSection
  public submitBonEntreeForm(): void {
    this.clickButton('section-form')
  }

  public modifierSection(SectionForm: NgForm): void {

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



    this.subscriptions.push(this.sectionsService.modifierSections(SectionForm.value).subscribe({
        next: (response: Sections) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie d'une section`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }



}
