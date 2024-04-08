import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BonPour } from 'src/app/model/bon-pour.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Agent } from 'src/app/model/agent.model';
import { Sections } from 'src/app/model/sections.model';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SectionsService } from 'src/app/services/sections.service';
import { AgentService } from 'src/app/services/agent.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDateService } from 'src/app/services/my-date.service';
import { MyDate } from 'src/app/model/my-date.model';
import { NgForm } from '@angular/forms';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';

@Component({
  selector: 'app-dotation-vehicule-detail-bon-sortie',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-detail-bon-sortie.component.html',
  styleUrl: './dotation-vehicule-detail-bon-sortie.component.css'
})
export class DotationVehiculeDetailBonSortieComponent implements OnInit, OnDestroy {

   // modelDate1: NgbDateStruct | null = null;
   modelDate1: NgbDateStruct | null = null;

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



  //  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  //  public typeUniteDouaniere: TypeUniteDouaniere = new TypeUniteDouaniere();



  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour = new ArticleBonPour();

  public sections: Sections[] = [];
  public section: Sections = new Sections();

   public agents: Agent[] = [];
   public agent: Agent = new Agent();

   public uniteDouanieres: UniteDouaniere[] = [];
   public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

   public bonDeSorties: BonSortie[] = [];
   public bonDeSortie: BonSortie = new BonSortie();




   private subscriptions: Subscription[] = [];

   constructor(
     public dialogRef: MatDialogRef<DotationVehiculeDetailBonSortieComponent>,
     private notificationService: NotificationService,
     @Inject(MAT_DIALOG_DATA) public bonPour: BonPour,
     private myDateService: MyDateService,
     private bonSortieService: BonSortieService,
     private articleBonPourService: ArticleBonPourService,
     private uniteDouaniereService: UniteDouaniereService,
     private sectionsService: SectionsService,
     private agentService: AgentService,
     private datePipe: DatePipe,
     private router: Router,
     private securiteService: SecuriteService


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
    this.listeAgents();
    this.listeSections();
    this.listeArticleBonPours();
    this.listeBonSorties();

   }



   ngOnDestroy(): void {
     this.subscriptions.forEach(sub => sub.unsubscribe());
   }

   popupFermer(): void {
     this.dialogRef.close();
   }




   myDateStringFormatter(date: MyDate | string | undefined): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }


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


  public listeArticleBonPours(): void {

    const subscription = this.articleBonPourService.listeArticleBonPours().subscribe({
      next: (response: ArticleBonPour[]) => {
        this.articleBonPours = response;
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
  public listeUniteDouanieres(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;
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

  public listeBonSorties(): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonDeSorties = response;
        // console.log(this.prestataires);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }




  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {


    this.submitBonDeSortieForm();
    //  this.submitBonDeSortieForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }


  // pour executer ajouterBonDeSortie
  public submitBonDeSortieForm(): void {
    this.clickButton('bon-de-sortie-form')
  }

  public ajouterBonDeSortie(bonDeSortieForm: NgForm): void {

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
    const dateBS: MyDate = bonDeSortieForm.value.dateBS;
    const formattedDate = this.bonSortieService.formatterMyDate(dateBS);

    // console.log(dateBL);


    // const bordereauLivraisonForm1: NgForm = bordereauLivraisonForm;
    // bordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // bordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);


    if (formattedDate) {
      bonDeSortieForm.value.dateBS = formattedDate;
    }

    // Unite Douaniere
    bonDeSortieForm.value.codeUniteDouaniere = this.uniteDouanieres[0];

     bonDeSortieForm.value.identifiantBP = this.articleBonPours[0];

       // SECTION ET AGENT

       bonDeSortieForm.value.nombreArme = 15;
       bonDeSortieForm.value.nombreAutomobile = 50;
       bonDeSortieForm.value.nombreMateriel = 100;
       bonDeSortieForm.value.codeSection = this.sections[0];
       bonDeSortieForm.value.matriculeAgent = this.agents[0];

     console.log(bonDeSortieForm.value);




    this.subscriptions.push(this.bonSortieService.ajouterBonSortie(bonDeSortieForm.value).subscribe({
        next: (response: BonSortie) => {
          this.bonDeSortie = response;
          console.log(this.bonDeSortie);
          this.popupFermer();
           this.goToListeBonsortie(this.uniteDouaniere)
          // this.sendNotification(NotificationType.SUCCESS, `Ajout réussie de ${response.ninea}`);
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussie`);
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }


   // --------------------------------------------------------------------------



  //  goToListeBonsortie(bonDeSortie: UniteDouaniere): void {

  //    this.router.navigate(['/dotation-vehicule-detail']);
  //  }


   goToListeBonsortie(uniteDouaniere: UniteDouaniere): void {
     const id = uniteDouaniere.codeUniteDouaniere;
     const encrypt = this.securiteService.encryptUsingAES256(id);
     this.router.navigate(['/dotation-vehicule-detail', encrypt]);
   }


}
