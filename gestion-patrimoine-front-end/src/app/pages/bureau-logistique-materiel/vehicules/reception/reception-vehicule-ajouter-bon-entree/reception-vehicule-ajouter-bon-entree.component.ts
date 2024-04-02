import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Prestataires } from 'src/app/model/prestataires.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { BordereauLivraison } from 'src/app/model/bordereau-livraison.model';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { BordereauLivraisonService } from 'src/app/services/bordereau-livraison.service';
import { SectionsService } from 'src/app/services/sections.service';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { NgForm } from '@angular/forms';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reception-vehicule-ajouter-bon-entree',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './reception-vehicule-ajouter-bon-entree.component.html',
  styleUrl: './reception-vehicule-ajouter-bon-entree.component.css'
})
export class ReceptionVehiculeAjouterBonEntreeComponent implements OnInit, OnDestroy {

  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;
  modelDate2: NgbDateStruct | null = null;

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


  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree = new BonEntree();

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();

  public sections: Sections[] = [];
  public section: Sections = new Sections();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public bordereauLivraisons: BordereauLivraison[] = [];
  public bordereauLivraison: BordereauLivraison = new BordereauLivraison();


  // ---------------------BORDEREAU LIVRAISON--------------------------------
  selectedValueConformiteBL: string = 'OUI';
  // ------------------------------------------------------------------------

  private subscriptions: Subscription[] = [];

  constructor(
    private datePipe: DatePipe,
    private bonEntreeService: BonEntreeService,
    private prestatairesService: PrestatairesService,
    private bordereauLivraisonService: BordereauLivraisonService,
    private sectionsService: SectionsService,
    private agentService: AgentService,
    private securiteService: SecuriteService,
    private router: Router,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<ReceptionVehiculeAjouterBonEntreeComponent>,
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
    this.listePrestataires();
    this.listeAgent();
    this.listeSections();
    this.listeBordereauLivraisons();
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeBordereauLivraisons(): void {

    const subscription = this.bordereauLivraisonService.listeBordereauLivraisons().subscribe({
      next: (response: BordereauLivraison[]) => {
        this.bordereauLivraisons = response;
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
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.agents);
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
  public listePrestataires(): void {

    const subscription = this.prestatairesService.listePrestataires().subscribe({
      next: (response: Prestataires[]) => {
        this.prestataires = response;
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


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeSections(): void {

    const subscription = this.sectionsService.listeSections().subscribe({
      next: (response: Sections[]) => {
        this.sections = response;
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

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeAgent(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
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
    this.submitBordereauLivraisonForm();
  }


  // --------------------------------------------------------------------------
  // pour executer ajouterBordereauLivraison
  public submitBordereauLivraisonForm(): void {
    this.clickButton('bordereau-livraison-form');
  }

  public ajouterBordereauLivraison(BordereauLivraisonForm: NgForm): void {

    const dateBordereauLivraison: MyDate = BordereauLivraisonForm.value.dateBL;
    const formattedDate = this.bordereauLivraisonService.formatterMyDate(dateBordereauLivraison);

    if (formattedDate) {
      BordereauLivraisonForm.value.dateBL = formattedDate;
    }

    // SECTION ET AGENT
    BordereauLivraisonForm.value.codeSection = this.sections[0];
    BordereauLivraisonForm.value.matriculeAgent = this.agents[0];


    this.subscriptions.push(this.bordereauLivraisonService.ajouterBordereauLivraison(BordereauLivraisonForm.value).subscribe({
        next: (response: BordereauLivraison) => {
          this.bordereauLivraison = response;
          console.log(this.bordereauLivraison);
          this.submitBonEntreeForm();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }


  // pour executer ajouterBonEntree
  public submitBonEntreeForm(): void {
    this.clickButton('bon-entree-form')
  }

  public ajouterBonEntree(BonEntreeForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 2
    const dateBonEntree: MyDate = BonEntreeForm.value.dateBonEntree;
    const formattedDate = this.bonEntreeService.formatterMyDate(dateBonEntree);

    if (formattedDate) {
      BonEntreeForm.value.dateBonEntree = formattedDate;
    }

    // BORDEREAU LIVRAISON
    BonEntreeForm.value.identifiantBL = this.bordereauLivraison;

     console.log(BonEntreeForm.value);

    this.subscriptions.push(this.bonEntreeService.ajouterBonEntree(BonEntreeForm.value).subscribe({
        next: (response: BonEntree) => {
          this.bonEntree = response;
          console.log(this.bonEntree);
          this.popupFermer();
          this.goToAjouterArticle(this.bonEntree)
          // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi`);
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


  // --------------------------------------------------------------------------



  goToAjouterArticle(bonEntree: BonEntree): void {
    const id = bonEntree.identifiantBE;
    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/reception-vehicule-detail', encrypt]);
  }






  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
