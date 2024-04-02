import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VehiculeAjouterDotationComponent } from 'src/app/composants/vehicule/vehicule-ajouter-dotation/vehicule-ajouter-dotation.component';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Agent } from 'src/app/model/agent.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { AgentService } from 'src/app/services/agent.service';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dotation-vehicule-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './dotation-vehicule-ajouter.component.html',
  styleUrl: './dotation-vehicule-ajouter.component.css'
})
export class DotationVehiculeAjouterComponent {

  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  public articleBonPour: ArticleBonPour = new ArticleBonPour();
  public articleBonPours: ArticleBonPour[] = [];

  quantiteAccordeeTotal: number = 0;

  private subscriptions: Subscription[] = [];


  public bonPours: BonPour[] = [];
  public bonPour: BonPour = new BonPour();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  nombreArticle: number = 0;



  // public articleBonPour: ArticleBonPour = new ArticleBonPour();


  constructor(
    public dialogRef: MatDialogRef<DotationVehiculeAjouterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { articleBonPour: ArticleBonPour, bonsortie: BonSortie },
    @Inject(MAT_DIALOG_DATA) public  data: { articleBonPour: ArticleBonPour, quantiteAccordeeTotal: number },
    private matDialog: MatDialog,
    private bonSortieService: BonSortieService,
    private agentService: AgentService,
    private bonPourService: BonPourService,
    private articleBonSortieService: ArticleBonSortieService,
    private notificationService: NotificationService,

    // @Inject(MAT_DIALOG_DATA) public section: Sections,
    // private matDialog: MatDialog,
    // private sectionsService: SectionsService,
    // private notificationService: NotificationService,

  ) {}

  ngOnInit(): void {
    // this.listeSecteurActivites();
    this.listeAgents();
    this.listeBonPours();
    this.listeBonDeSorties();
    // this.listeArticleBonSorties();


   this.articleBonPour = this.data.articleBonPour;

   this.quantiteAccordeeTotal= this.data.quantiteAccordeeTotal


  //  this.bonSortie = this.data.bonsortie;

  }

  popupFermer(): void {
    this.dialogRef.close();

  }


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }




  public listeArticleBonSorties(): void {

    const subscription = this.articleBonSortieService.listeArticleBonSorties().subscribe({
      next: (response: ArticleBonSortie[]) => {
        this.articleBonSorties = response;
         console.log(this.articleBonSorties);

         console.log(this.bonSortie);

        //  this.listeBonDeSorties


        this.nombreArticle = this.nombreArticleBonSortie(this.bonSortie, this.articleBonSorties);

        console.log(this.nombreArticle);

        //this.codeArticleBonEntree =  this.nombreArticle;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }





  public listeBonDeSorties(): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonSorties = response;
        // this.bonDeSortie = this.filtreBonPourArticleBonSortie(this.articleBonPour.identifiantBP, this.bonDeSorties);
        this.bonSortie = this.AfficherFormBonSortie(this.articleBonPour, this.bonSorties);
        // console.log(this.bonSortie);
        // console.log(this.bonPour);

        this.listeArticleBonSorties();


      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
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


  public listeBonPours(): void {

    const subscription = this.bonPourService.listeBonPours().subscribe({
      next: (response: BonPour[]) => {
        this.bonPours = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }







  AfficherFormBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[]): BonSortie {


    console.log(this.articleBonPour.identifiantBonPour);

    for (const bonSortie of bonSorties) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (articleBonPour.identifiantBonPour  ===  bonSortie.identifiantBonPour.identifiantBonPour) {

        return bonSortie;
      }

    }


    return new BonSortie();
  }


  public ajouterBonSortie(BonSortieForm: NgForm): void {

    //  AGENT
    BonSortieForm.value.numeroBonSortie = 'BS005';
    BonSortieForm.value.matriculeAgent = this.agents[0];
    // BonSortieForm.value.identifiantBonPour = this.articleBonPour.identifiantBonPour;
    BonSortieForm.value.identifiantBonPour = this.bonPours.find(bonPour => bonPour.identifiantBonPour === this.articleBonPour.identifiantBonPour);


    // CONFORMITE BORDEREAU LIVRAISON
    // BordereauLivraisonForm.value.conformiteBL = 'oui';

    console.log(BonSortieForm.value);


    this.subscriptions.push(this.bonSortieService.ajouterBonSortie(BonSortieForm.value).subscribe({
      next: (response: BonSortie) => {
        this.bonSortie = response;
        console.log(this.bonSortie);

      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    })
    );

  }




  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  private clickButton1(buttonId1: string): void {
    document.getElementById(buttonId1)?.click();
  }


  // pour envoyer tous les formulaires

  public submitForm(): void {


     this.clickButton1('bon-sortie-form');


  }


  public submitArticleBonSortieForm(): void {




    // this.submitForm();

    this.clickButton('article-bon-sortie-form');


  }


  nombreArticleBonSortie(bonSortie: BonSortie, articleBonSorties: ArticleBonSortie[]): number {
    const matchingArticles = articleBonSorties.filter(articleBonSortie => bonSortie && articleBonSortie.codeArticleBonSortie && bonSortie.identifiantBonSortie === articleBonSortie.identifiantBonSortie);
    return matchingArticles.length + 1;
}






  // --------------------------------------------------------------------------
  // pour executer ajouterPrestataire
  // public submitBonEntreeForm(): void {
  //   this.clickButton('article-bon-sortie-form')
  // }

  public ajouterArticleBonSortie(ArticleBonSortieForm: NgForm): void {





    let quantiteAccordee: number = ArticleBonSortieForm.value.quantiteAccordee;

    let quantitePermise: number = this.articleBonPour.quantiteDemandee - this.quantiteAccordeeTotal;

    if (quantitePermise <  quantiteAccordee ) {


      this.sendNotification(NotificationType.ERROR, `Vous avez dépassé la limite de quantité permise (${quantitePermise}) véhicule(s)`);

      return ;



    }

    this.articleBonSortie.quantiteAccordee= quantiteAccordee;
    this.articleBonSortie.libelleArticleBonSortie= "LIBELLE " + quantiteAccordee + " BS";
    this.articleBonSortie.identifiantBonSortie= this.bonSortie.identifiantBonSortie;
    this.articleBonSortie.codeArticleBonSortie= this.nombreArticle;
    this.articleBonSortie.dateArticleBonSortie = null;
    this.articleBonSortie.matriculeAgent= this.agents[0];
    // this.articleBonSortie.codeArticleBonSortie= ArticleBonSortieForm.value.codeArticleBonSortie;
    // console.log(this.articleBonPour,this.articleBonSortie);
    console.log(this.articleBonSortie);



    this.popupVehicule( this.articleBonPour, this.articleBonSortie);


  }

  popupVehicule( articleBonPour: ArticleBonPour, articleBonSortie: ArticleBonSortie): void {
    const dialogRef = this.matDialog.open(
      VehiculeAjouterDotationComponent,
      {
        width: '80%',
        // height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:  {
          articleBonPour: articleBonPour,
          articleBonSortie: articleBonSortie

        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
     // if (dialogRef.componentInstance instanceof PopupSecteurActiviteComponent) {
       // this.secteurActivitesSelect = dialogRef.componentInstance.secteurActivitesSelect;
        // console.log(this.secteurActivitesSelect);
     // }
      // ----------------------------------
      this.popupFermer();
    });
  }




}
