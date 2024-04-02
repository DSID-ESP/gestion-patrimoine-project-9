import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Agent } from 'src/app/model/agent.model';
import { Sections } from 'src/app/model/sections.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { AgentService } from 'src/app/services/agent.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';

@Component({
  selector: 'app-agent-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './agent-ajouter.component.html',
  styleUrl: './agent-ajouter.component.css'
})
export class AgentAjouterComponent implements OnInit, OnDestroy {


  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  public sections: Sections[] = [];
  public section: Sections = new Sections();


  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgentAjouterComponent>,
    private agentService: AgentService,
    private uniteDouaniereService: UniteDouaniereService,
    private notificationService: NotificationService,
    private sectionsServices: SectionsService,
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    // this.listeAgents();
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



  popupFermer(): void {
    this.dialogRef.close();
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
  // pour executer ajouterBonEntree
  public submitAgentForm(): void {
    this.clickButton('agent-form')
  }


  public ajouterAgent(AgentForm: NgForm): void {

    const agentValue: Agent = {
      ...AgentForm.value, // Récupère les autres valeurs de AgentForm.value
      matriculeAgent: AgentForm.value.matriculeAgent.toUpperCase(),
      codeAgent: AgentForm.value.codeAgent.toUpperCase(),
      prenomAgent: AgentForm.value.prenomAgent.toUpperCase(),
      nomAgent: AgentForm.value.nomAgent.toUpperCase(),
      emailAgent: AgentForm.value.emailAgent.toUpperCase()
  };

  // console.log(agentValue);
  

    this.subscriptions.push(this.agentService.ajouterAgent(AgentForm.value).subscribe({
        next: (response: Agent) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de l'agent`);
        },
        error: (errorResponse: HttpErrorResponse) => {
          // console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
    );
  }
  // --------------------------------------------------------------------------


  onSubmit(): void {
    // this.ajouterAgent(AgentForm: NgForm);

  }

}
