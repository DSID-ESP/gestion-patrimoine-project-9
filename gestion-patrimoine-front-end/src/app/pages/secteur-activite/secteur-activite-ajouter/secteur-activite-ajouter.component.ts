import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Subscription } from 'rxjs';
import { SecuriteService } from 'src/app/services/securite.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { SecteurActiviteDetailComponent } from 'src/app/composants/secteur-activite/secteur-activite-detail/secteur-activite-detail.component';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-secteur-activite-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './secteur-activite-ajouter.component.html',
  styleUrl: './secteur-activite-ajouter.component.css'
})
export class SecteurActiviteAjouterComponent implements OnInit, OnDestroy  {

     // ----------------------------------------------------------------------------------
     public secteurActivites: SecteurActivite[] = [];
     public secteurActivite: SecteurActivite = new SecteurActivite();



     private subscriptions: Subscription[] = [];

     constructor(

       private secteurActiviteService: SecteurActiviteService,
       private securiteService: SecuriteService,
       private router: Router,
       private matDialog: MatDialog,
       public dialogRef: MatDialogRef<SecteurActiviteAjouterComponent>,
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




     // --------------------------------------------------------------------------
     private clickButton(buttonId: string): void {
       document.getElementById(buttonId)?.click();
     }

     // pour envoyer tous les formulaires
     public submitForm(): void {


       this.submitSecteurActiviteForm();
       //  this.submitBonDeSortieForm();

       // this.popupFermer();
       // this.router.navigate(['/ajouter-article']);
     }



     // --------------------------------------------------------------------------
     // pour executer ajouterSecteurActivite
     public submitSecteurActiviteForm(): void {
       this.clickButton('secteur-activite-form')
     }

     public ajouterSecteurActivite(SecteurActiviteForm: NgForm): void {



       this.subscriptions.push(this.secteurActiviteService.ajouterSecteurActivite(SecteurActiviteForm.value).subscribe({
           next: (response: SecteurActivite) => {
             this.secteurActivite = response;
             console.log(this.secteurActivite);
             this.popupFermer();
             // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
             this.sendNotification(NotificationType.SUCCESS, `Ajout réussi d'un secteur activité `);

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
