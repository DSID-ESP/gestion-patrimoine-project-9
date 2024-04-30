import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-validation',
  // standalone: true,
  // imports: [],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent implements OnInit, OnDestroy {

  reponseValidation: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ValidationComponent>,
    // @Inject(MAT_DIALOG_DATA) public informations: any,
    // private notificationService: NotificationService,
    // private agentService: AgentService,
    // private secteurActiviteService: SecteurActiviteService,
    // private sectionsService: SectionsService,
    // private uniteDouaniereService: UniteDouaniereService,
    // private fonctionAgentService: FonctionAgentService
  ) { }


  // private sendNotification(type: NotificationType, message: string, titre?: string): void {
  //   if (message) {
  //     this.notificationService.showAlert(type, message, titre);
  //   } else {
  //     this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
  //   }
  // }


 


  ngOnInit(): void {

  }


  popupFermer(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  oui(): void {
    this.reponseValidation = true;
    this.popupFermer();
  }

  non(): void {
    this.reponseValidation = false;
    this.popupFermer();
  }

}