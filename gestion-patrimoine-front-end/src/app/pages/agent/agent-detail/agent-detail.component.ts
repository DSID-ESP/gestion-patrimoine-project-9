import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Agent } from 'src/app/model/agent.model';
import { Sections } from 'src/app/model/sections.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { AgentService } from 'src/app/services/agent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';

@Component({
  selector: 'app-agent-detail',
  // standalone: true,
  // imports: [],
  templateUrl: './agent-detail.component.html',
  styleUrl: './agent-detail.component.css'
})
export class AgentDetailComponent implements OnInit, OnDestroy {

  afficherPopupDetail: boolean = true;


  public agents: Agent[] = [];
  // public agent: Agent = new Agent();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  public sections: Sections[] = [];
  public section: Sections = new Sections();


  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgentDetailComponent>,
    private agentService: AgentService,
    private uniteDouaniereService: UniteDouaniereService,
    private notificationService: NotificationService,
    private sectionsServices: SectionsService,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public agent: Agent,
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
    this.listeUniteDouanieres();
    this.listeSections();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeSections(): void {

    const subscription = this.sectionsServices.listeSections().subscribe({
      next: (response: Sections[]) => {
        this.sections = response;
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


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeUniteDouanieres(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  supprimerAgentById(matriculeAgent: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: matriculeAgent,
          categorie: "agent",
          message: "Voulez-vous supprimer cet agent?"
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
    this.clickButton('agent-form');
  }


  // --------------------------------------------------------------------------

  // pour executer ajouterAgent
  public submitAgentForm(): void {
    this.clickButton('agent-form')
  }

  public modifierAgent(AgentForm: NgForm): void { 

    // BordereauLivraisonForm.value.ninea = this.prestataires.find(prestataire => prestataire.raisonSociale === BordereauLivraisonForm.value.ninea);;

    AgentForm.value.codeUniteDouaniere = this.uniteDouanieres.find(uniteDouaniere => uniteDouaniere.nomUniteDouaniere === AgentForm.value.codeUniteDouaniere);
    AgentForm.value.codeSection = this.sections.find(section => section.libelleSection === AgentForm.value.codeSection);

    // console.log(AgentForm.value);

    this.subscriptions.push(this.agentService.modifierAgent(AgentForm.value).subscribe({
        next: (response: Agent) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie de l'agent`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }
  // --------------------------------------------------------------------------

}
