import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { FonctionAgent } from 'src/app/model/fonction-agent.model';
import { FonctionAgentService } from 'src/app/services/fonction-agent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SecuriteService } from 'src/app/services/securite.service';

@Component({
  selector: 'app-fonction-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './fonction-ajouter.component.html',
  styleUrl: './fonction-ajouter.component.css'
})
export class FonctionAjouterComponent implements OnInit, OnDestroy {

     // ----------------------------------------------------------------------------------
     public fonctionAgents: FonctionAgent[] = [];
     public fonctionAgent: FonctionAgent = new FonctionAgent();



     private subscriptions: Subscription[] = [];

     constructor(

       private fonctionAgentService: FonctionAgentService,
       private securiteService: SecuriteService,
       private router: Router,
       private matDialog: MatDialog,
       public dialogRef: MatDialogRef<FonctionAjouterComponent>,
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


       this.submitFonctionForm();
       //  this.submitBonDeSortieForm();

       // this.popupFermer();
       // this.router.navigate(['/ajouter-article']);
     }



     // --------------------------------------------------------------------------
     // pour executer ajouterUniteDouaniere
     public submitFonctionForm(): void {
       this.clickButton('fonction-form')
     }

     public ajouterFonctionAgent(FonctionAgentForm: NgForm): void {



       this.subscriptions.push(this.fonctionAgentService.ajouterFonctionAgents(FonctionAgentForm.value).subscribe({
           next: (response: FonctionAgent) => {
             this.fonctionAgent = response;
             console.log(this.fonctionAgent);
             this.popupFermer();
             // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
             this.sendNotification(NotificationType.SUCCESS, `Ajout réussi d'une fonction `);

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
