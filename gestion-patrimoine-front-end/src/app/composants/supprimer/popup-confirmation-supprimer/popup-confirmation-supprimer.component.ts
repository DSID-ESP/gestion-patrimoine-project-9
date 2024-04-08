import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpRespone } from 'src/app/model/custom-http-response.model';
import { AgentService } from 'src/app/services/agent.service';
import { FonctionAgentService } from 'src/app/services/fonction-agent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
// import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-popup-confirmation-supprimer',
  templateUrl: './popup-confirmation-supprimer.component.html',
  styleUrls: ['./popup-confirmation-supprimer.component.css']
})
export class PopupConfirmationSupprimerComponent implements OnInit, OnDestroy {


  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopupConfirmationSupprimerComponent>,
    @Inject(MAT_DIALOG_DATA) public informations: any,
    private notificationService: NotificationService,
    private agentService: AgentService,
    private secteurActiviteService: SecteurActiviteService,
    private sectionsService: SectionsService,
    private uniteDouaniereService: UniteDouaniereService,
    private fonctionAgentService: FonctionAgentService
  ) { }


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }


 
  supprimeronfirmer(id: string, categorie: string): void {

    switch (categorie) {
      case "agent":
        this.subscriptions.push(
          this.agentService.supprimerAgentById(id).subscribe({
            next: (response: CustomHttpRespone) => {
              this.popupFermer();
              this.sendNotification(NotificationType.SUCCESS, response.message);
            },
            error: (erreurs: HttpErrorResponse) => {
              console.log(erreurs);
            }
          })
        );
        break;

      case "secteurActivite":
        this.subscriptions.push(
          this.secteurActiviteService.supprimerSecteurActivite(id).subscribe({
            next: (response: CustomHttpRespone) => {
              this.popupFermer();
              this.sendNotification(NotificationType.SUCCESS, response.message);
            },
            error: (erreurs: HttpErrorResponse) => {
              console.log(erreurs);
            }
          })
        );
        break;

        case "section":
        this.subscriptions.push(
          this.sectionsService.supprimerSections(id).subscribe({
            next: (response: CustomHttpRespone) => {
              this.popupFermer();
              console.log(response);
              
              this.sendNotification(NotificationType.SUCCESS, response.message);
            },
            error: (erreurs: HttpErrorResponse) => {
              console.log(erreurs);
            }
          })
        );
        break;

        case "fonction":
          this.subscriptions.push(
            this.fonctionAgentService.supprimerFonctionAgentById(id).subscribe({
              next: (response: CustomHttpRespone) => {
                this.popupFermer();
                this.sendNotification(NotificationType.SUCCESS, response.message);
              },
              error: (erreurs: HttpErrorResponse) => {
                console.log(erreurs);
              }
            })
          );
          break;

          case "uniteDouaniere":
            this.subscriptions.push(
              this.uniteDouaniereService.supprimerUniteDouaniere(id).subscribe({
                next: (response: CustomHttpRespone) => {
                  this.popupFermer();
                  this.sendNotification(NotificationType.SUCCESS, response.message);
                },
                error: (erreurs: HttpErrorResponse) => {
                  console.log(erreurs);
                }
              })
            );
            break;


      default:

        break;
    }


  }

  ngOnInit(): void {

  }


  popupFermer(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}