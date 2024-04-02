import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BonPour } from 'src/app/model/bon-pour.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecuriteService } from 'src/app/services/securite.service';
import { AgentService } from 'src/app/services/agent.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyDate } from 'src/app/model/my-date.model';

@Component({
  selector: 'app-ajouter-bon-pour-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './ajouter-bon-pour-ajouter.component.html',
  styleUrl: './ajouter-bon-pour-ajouter.component.css'
})
export class AjouterBonPourAjouterComponent implements OnInit, OnDestroy {


  etatBonPour: string = 'Initial';


  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;
  modelDate2: NgbDateStruct | null = null;
  modelDate3: NgbDateStruct | null = null;
  modelDate4: NgbDateStruct | null = null;

  formatDate(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }

    // Crée un objet JavaScript Date à partir de NgbDateStruct
    const jsDate = new Date(date.year, date.month - 1, date.day);

    // Utilise DatePipe pour formater la date avec le mois complet
    return this.datePipe.transform(jsDate, 'dd MMMM yyyy') || '';
  }
  // ----------------------------------------------------------------------------------

  public bonPours: BonPour[] = [];
  public bonPour: BonPour | undefined;

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour | undefined;

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public sections: Sections[] = [];
  public section: Sections | undefined;

  public agents: Agent[] = [];
  public agent: Agent | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AjouterBonPourAjouterComponent>,
    private router: Router,
    private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private uniteDouaniereService: UniteDouaniereService,
    private sectionsService: SectionsService,
    private agentService: AgentService,
    private securiteService: SecuriteService,
    private matDialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeUniteDouanieres();
    this.listeSections();
    this.listeAgents();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeUniteDouanieres(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;
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
  public listeSections(): void {

    const subscription = this.sectionsService.listeSections().subscribe({
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
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
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


  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('bon-pour-form');
  }


  // --------------------------------------------------------------------------

  // pour executer ajouterBonEntree
  public submitBonPourForm(): void {
    this.clickButton('bon-pour-form')
  }

  public ajouterBonPour(BonPourForm: NgForm): void {

    const dateCourrielOrigine: MyDate = BonPourForm.value.dateCourrielOrigine;
    const dateArriveDLF: MyDate = BonPourForm.value.dateArriveDLF;
    const dateArriveBLM: MyDate = BonPourForm.value.dateArriveBLM;
    const dateArriveSection: MyDate = BonPourForm.value.dateArriveSection;

    const formattedDate1 = this.bonPourService.formatterMyDate(dateCourrielOrigine);
    const formattedDate2 = this.bonPourService.formatterMyDate(dateArriveDLF);
    const formattedDate3 = this.bonPourService.formatterMyDate(dateArriveBLM);
    const formattedDate4 = this.bonPourService.formatterMyDate(dateArriveSection);

    if (formattedDate1 && formattedDate2 && formattedDate3 && formattedDate4) {
      BonPourForm.value.dateCourrielOrigine = formattedDate1;
      BonPourForm.value.dateArriveDLF = formattedDate2;
      BonPourForm.value.dateArriveBLM = formattedDate3;
      BonPourForm.value.dateArriveSection = formattedDate4;
    } else {
      console.log("erreur date");

    }

    // SECTIONS AGENT
    BonPourForm.value.codeSection = this.sections[1];
    BonPourForm.value.matriculeAgent = this.agents[0];

    BonPourForm.value.etatBonPour = this.etatBonPour;

    console.log(BonPourForm.value);

    this.subscriptions.push(this.bonPourService.ajouterBonPour(BonPourForm.value).subscribe({
        next: (response: BonPour) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du bon pour`);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
    );
  }
  // --------------------------------------------------------------------------



  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
