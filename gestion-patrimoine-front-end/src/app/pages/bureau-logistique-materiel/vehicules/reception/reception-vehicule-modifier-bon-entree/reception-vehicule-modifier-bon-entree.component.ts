import { Component, Inject, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { FormControl, NgForm, Validators } from '@angular/forms';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyDateService } from 'src/app/services/my-date.service';

@Component({
  selector: 'app-reception-vehicule-modifier-bon-entree',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './reception-vehicule-modifier-bon-entree.component.html',
  styleUrl: './reception-vehicule-modifier-bon-entree.component.css'
})
export class ReceptionVehiculeModifierBonEntreeComponent implements OnInit, OnDestroy {

  // ----------------------------------------------------------------------------------
  // dateBLControl = new FormControl('', Validators.required);
  // dateBLControl = new FormControl(
  //   this.formatDate(new Date(2024, 0, 25)),
  //   Validators.required
  // );

  modelDate1: NgbDateStruct | null = null;
  modelDate2: NgbDateStruct | null = null;

  formatDateModelNgbDateStruct(date: NgbDateStruct | null): string {
    return this.myDateService.formatDateModelNgbDateStruct(date);
  }

  formatterStringToNgbDateStruct(date: string): NgbDateStruct {
    return this.myDateService.formatterStringToNgbDateStruct(date);
  }

  // formatDate(date: Date): string {
  //   const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  //   return date.toLocaleDateString('fr-FR', options);
  // }
  // ----------------------------------------------------------------------------------

  // public BonEntrees: BonEntree[] = [];
  // public BonEntree: BonEntree = new BonEntree();

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
    private myDateService: MyDateService,
    private router: Router,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<ReceptionVehiculeModifierBonEntreeComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public bonEntree: BonEntree,
  ) {
    // this.form = this.fb.group({
    //   due_date: [''],
    // });
  }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    const dateBL = this.bonEntree.identifiantBL.dateBL.toString();
    this.modelDate1 = this.formatterStringToNgbDateStruct(dateBL);

    const dateBonEntree = this.bonEntree.dateBonEntree.toString();
    this.modelDate2 = this.formatterStringToNgbDateStruct(dateBonEntree);


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
    // this.submitBonEntreeForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }



  // --------------------------------------------------------------------------
  // pour executer ajouterBordereauLivraison
  public submitBordereauLivraisonForm(): void {
    this.clickButton('bordereau-livraison-form')
  }

  public modifierBordereauLivraison(BordereauLivraisonForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.bordereauLivraisonService.createBordereauLivraisonFormData(BordereauLivraisonForm.value);

    // this.subscriptions.push(this.bordereauLivraisonService.ajouterBordereauLivraisonRequestParam(formData).subscribe({
    //     next: (response: BordereauLivraison) => {
    //       console.log(response);

    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2
    const dateBL: MyDate = BordereauLivraisonForm.value.dateBL;
    const formattedDate = this.bordereauLivraisonService.formatterMyDate(dateBL);

    // const bordereauLivraisonForm1: NgForm = BordereauLivraisonForm;
    // BordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // BordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);


    if (formattedDate) {
      BordereauLivraisonForm.value.dateBL = formattedDate;
    }

    BordereauLivraisonForm.value.identifiantBL = this.bonEntree.identifiantBL.identifiantBL;
    // BordereauLivraisonForm.value.matriculeAgent = this.bonEntree.identifiantBL.;

    // SECTION ET AGENT
    BordereauLivraisonForm.value.codeSection = this.sections[0];
    BordereauLivraisonForm.value.matriculeAgent = this.agents[0];

    // PRESTATAIRES
    BordereauLivraisonForm.value.ninea = this.prestataires.find(prestataire => prestataire.raisonSociale === BordereauLivraisonForm.value.ninea);

    // CONFORMITE BORDEREAU LIVRAISON
    // BordereauLivraisonForm.value.conformiteBL = 'oui';

    // console.log(BordereauLivraisonForm.value);
    // console.log(this.bonEntree.identifiantBL);



    this.subscriptions.push(this.bordereauLivraisonService.modifierBordereauLivraison(BordereauLivraisonForm.value).subscribe({
        next: (response: BordereauLivraison) => {
          this.bordereauLivraison = response;
          // console.log(this.bordereauLivraison);
          this.submitBonEntreeForm();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }

  // --------------------------------------------------------------------------




  // --------------------------------------------------------------------------
  // pour executer ajouterBonEntree
  public submitBonEntreeForm(): void {
    this.clickButton('bon-entree-form')
  }

  public modifierBonEntree(bonEntreeForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.bonEntreeService.createBonEntreeFormData(bonEntreeForm.value);

    // this.subscriptions.push(this.bonEntreeService.ajouterBonEntreeRequestParam(formData).subscribe({
    //     next: (response: BonEntree) => {
    //       console.log(response);

    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2
    const dateBE: MyDate = bonEntreeForm.value.dateBonEntree;
    const formattedDate = this.bonEntreeService.formatterMyDate(dateBE);

    // console.log(dateBL);


    // const bordereauLivraisonForm1: NgForm = bordereauLivraisonForm;
    // bordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // bordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);


    if (formattedDate) {
      bonEntreeForm.value.dateBonEntree = formattedDate;
    }

    bonEntreeForm.value.identifiantBE = this.bonEntree.identifiantBE;

    // BORDEREAU LIVRAISON
    bonEntreeForm.value.identifiantBL = this.bordereauLivraison;

    console.log(bonEntreeForm.value);


    this.subscriptions.push(this.bonEntreeService.modifierBonEntree(bonEntreeForm.value).subscribe({
        next: (response: BonEntree) => {
          this.bonEntree = response;
          // console.log(this.bonEntree);
          this.popupFermer();
          // this.goToAjouterArticle(this.bonEntree)
          // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
          this.sendNotification(NotificationType.SUCCESS, `Modification réussie`);
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



  // goToAjouterArticle(bonEntree: BonEntree): void {
  //   const id = bonEntree.identifiantBE;
  //   const encrypt = this.securiteService.encryptUsingAES256(id);
  //   this.router.navigate(['/reception-vehicule-detail', encrypt]);
  // }





  // comparerSelected(value1: string, value2: string): boolean {
  //   // const valeur1 = value1.replace(/\s/g, "").replace(/-/g, "").toLowerCase();
  //   // const valeur2 = value2.replace(/\s/g, "").replace(/-/g, "").toLowerCase();
  //   return value1 === value2;
  // }





  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
