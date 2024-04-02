import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sections } from 'src/app/model/sections.model';
import { Subscription } from 'rxjs';
import { SectionsService } from 'src/app/services/sections.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sections-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './sections-ajouter.component.html',
  styleUrl: './sections-ajouter.component.css'
})
export class SectionsAjouterComponent implements OnInit, OnDestroy {

   // ----------------------------------------------------------------------------------
   public sections: Sections[] = [];
   public section: Sections = new Sections();



   private subscriptions: Subscription[] = [];

   constructor(

     private sectionsService: SectionsService,
     private securiteService: SecuriteService,
     private router: Router,
     private matDialog: MatDialog,
     public dialogRef: MatDialogRef<SectionsAjouterComponent>,
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


     this.submitSectionForm();
     //  this.submitBonDeSortieForm();

     // this.popupFermer();
     // this.router.navigate(['/ajouter-article']);
   }



   // --------------------------------------------------------------------------
   // pour executer ajouterSection
   public submitSectionForm(): void {
     this.clickButton('section-form')
   }

   public ajouterSections(SectionForm: NgForm): void {



     this.subscriptions.push(this.sectionsService.ajouterSections(SectionForm.value).subscribe({
         next: (response: Sections) => {
           this.section = response;
           console.log(this.section);
           this.popupFermer();
           // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
           this.sendNotification(NotificationType.SUCCESS, `Ajout réussi d'une section `);

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
