import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Subscription } from 'rxjs';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unite-douaniere-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './unite-douaniere-ajouter.component.html',
  styleUrl: './unite-douaniere-ajouter.component.css'
})
export class UniteDouaniereAjouterComponent implements OnInit, OnDestroy{


  // ----------------------------------------------------------------------------------
  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere = new TypeUniteDouaniere();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  private subscriptions: Subscription[] = [];

  constructor(
    private typeUniteDouaniereService: TypeUniteDouaniereService,
    private uniteDouaniereService: UniteDouaniereService,
    private securiteService: SecuriteService,
    private router: Router,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<UniteDouaniereAjouterComponent>,
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
    this.listeTypeUniteDouanieres();
    this.listeUniteDouanieres();
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeUniteDouanieres(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;
        // console.log(this.bordereauLivraisons);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------




  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
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
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {


    this.submitUniteDouaniereForm();
    //  this.submitBonDeSortieForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }



  // --------------------------------------------------------------------------
  // pour executer ajouterUniteDouaniere
  public submitUniteDouaniereForm(): void {
    this.clickButton('unite-douaniere-form')
  }

  public ajouterUniteDouaniere(UniteDouaniereForm: NgForm): void {

    UniteDouaniereForm.value.nombreArme = 15;
    UniteDouaniereForm.value.nombreAutomobile = 50;
    UniteDouaniereForm.value.nombreMateriel = 100;

    this.subscriptions.push(this.uniteDouaniereService.ajouterUniteDouaniere(UniteDouaniereForm.value).subscribe({
        next: (response: UniteDouaniere) => {
          this.uniteDouaniere = response;
          console.log(this.uniteDouaniere);
          this.popupFermer();
          // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de l'unité`);

        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }

  // --------------------------------------------------------------------------



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  popupFermer(): void {
    this.dialogRef.close();
  }




}
