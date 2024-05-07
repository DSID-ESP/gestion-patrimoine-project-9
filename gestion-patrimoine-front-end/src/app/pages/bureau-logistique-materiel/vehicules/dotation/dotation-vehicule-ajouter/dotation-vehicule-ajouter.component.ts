import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { VehiculeAjouterDotationComponent } from 'src/app/composants/vehicule/vehicule-ajouter-dotation/vehicule-ajouter-dotation.component';
import { EtatBonPour } from 'src/app/enum/etat-bon-pour.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Agent } from 'src/app/model/agent.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { AgentService } from 'src/app/services/agent.service';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { FonctionUtilisateurService } from 'src/app/services/fonction-utilisateur.service';
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

  public utilisateurs: Utilisateur[] = [];
  public utilisateur: Utilisateur | undefined;

  nombreArticle: number = 0;

  estBAF: boolean = false;
  estDLF: boolean = false;
  estBLM: boolean = false;
  estSection: boolean = false;

  // ----------------------------------------------------------------------------------

  etatsBonPourArray = Object.values(EtatBonPour);


  // INITIAL: EtatBonPour = EtatBonPour.INITIAL;
  // BAF: EtatBonPour = EtatBonPour.BAF;
  // ALLERDLF: EtatBonPour = EtatBonPour.ALLERDLF;
  // ALLERBLM: EtatBonPour = EtatBonPour.ALLERBLM;
  // ALLERSECTION: EtatBonPour = EtatBonPour.ALLERSECTION;
  RETOURSECTION: EtatBonPour = EtatBonPour.RETOURSECTION;
  RETOURBLM: EtatBonPour = EtatBonPour.RETOURBLM;
  RETOURDLF: EtatBonPour = EtatBonPour.RETOURDLF;
  TERMINER: EtatBonPour = EtatBonPour.TERMINER;

  quantiteAccordeeSection: number = 0;
  quantiteAccordeeDLF: number = 0;
  quantiteAccordeeBLM: number = 0;



  // public articleBonPour: ArticleBonPour = new ArticleBonPour();


  constructor(
    public dialogRef: MatDialogRef<DotationVehiculeAjouterComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: { articleBonPour: ArticleBonPour, bonsortie: BonSortie },
    @Inject(MAT_DIALOG_DATA) public data: { articleBonPour: ArticleBonPour, quantiteAccordeeTotal: number, bonpour: BonPour},
    private matDialog: MatDialog,
    private bonSortieService: BonSortieService,
    private agentService: AgentService,
    private bonPourService: BonPourService,
    private articleBonSortieService: ArticleBonSortieService,
    private fonctionUtilisateurService: FonctionUtilisateurService,
    private notificationService: NotificationService,

    // @Inject(MAT_DIALOG_DATA) public section: Sections,
    // private matDialog: MatDialog,
    // private sectionsService: SectionsService,
    // private notificationService: NotificationService,

  ) { }

  ngOnInit(): void {
    this.listeBonDeSorties();
    this.listeAgents();
    this.listeBonPours();

    this.utilisateur = this.fonctionUtilisateurService.getUtilisateur;
    this.estBAF = this.fonctionUtilisateurService.estBAF;
    this.estDLF = this.fonctionUtilisateurService.estDLF;
    this.estBLM = this.fonctionUtilisateurService.estBLM;
    this.estSection = this.fonctionUtilisateurService.estSection;

    this.articleBonPour = this.data.articleBonPour;
    this.quantiteAccordeeTotal = this.data.quantiteAccordeeTotal
    this.bonPour = this.data.bonpour



  }

  popupFermer(): void {
    this.dialogRef.close();

  }


  etatSuivant(etatBonPour: EtatBonPour): EtatBonPour {
    const currentIndex = this.etatsBonPourArray.indexOf(etatBonPour);
    const nextIndex = (currentIndex + 1) % this.etatsBonPourArray.length;
    return this.etatsBonPourArray[nextIndex];
  }


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }




  public listeArticleBonSorties(bonSorties: BonSortie[]): void {

    const subscription = this.articleBonSortieService.listeArticleBonSorties().subscribe({
      next: (response: ArticleBonSortie[]) => {
        this.articleBonSorties = response;

        console.log(this.bonPour.etatBonPour == EtatBonPour.TERMINER);

        this.nombreArticle = this.nombreArticleBonSortie(this.articleBonPour, bonSorties, this.articleBonSorties);


        // if (this.bonPour.etatBonPour == EtatBonPour.TERMINER) {
        //   this.nombreArticle = this.nombreArticleBonSortie(this.articleBonPour, bonSorties, this.articleBonSorties);
        // } else {
        //   this.nombreArticle = this.nombreArticleBonSortie(this.articleBonPour, bonSorties, this.articleBonSorties);
        // }

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

        this.listeArticleBonSorties(this.bonSorties);

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







  // AfficherFormBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[]): BonSortie {

  //   // console.log(this.articleBonPour.identifiantBonPour);
  //   for (const bonSortie of bonSorties) {
  //     // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
  //     if (articleBonPour.identifiantBonPour === bonSortie.codeArticleBonPour.identifiantBonPour) {
  //       return bonSortie;
  //     }
  //   }

  //   return new BonSortie();
  // }


  // public ajouterBonSortie(BonSortieForm: NgForm): void {

  //   this.bonSortie.numeroBonSortie = 'BS005';
  //   this.bonSortie.dateBonSortie = null;
  //   this.bonSortie.matriculeAgent = this.agents[0];
  //   this.bonSortie.identifiantBonPour = this.bonPour;
  //   this.bonSortie.descriptionBonSortie = BonSortieForm.value.descriptionBonSortie;

  //   this.subscriptions.push(this.bonSortieService.ajouterBonSortie(this.bonSortie).subscribe({
  //     next: (response: BonSortie) => {
  //       this.bonSortie = response;

  //       this.clickButton('article-bon-sortie-form');

  //     },
  //     error: (errorResponse: HttpErrorResponse) => {

  //     }
  //   })
  //   );

  // }


  public ajouterBonSortie(BonSortieForm: NgForm): void {



      this.bonSortie.numeroBonSortie = 'BS000';
      this.bonSortie.dateBonSortie = null;
      this.bonSortie.matriculeAgent = this.utilisateur ? this.utilisateur.matriculeAgent : new Agent(); // utilisateur peut etre undefied
      this.bonSortie.codeArticleBonPour = this.articleBonPour;
      this.bonSortie.descriptionBonSortie = BonSortieForm.value.descriptionBonSortie;

      this.subscriptions.push(this.bonSortieService.ajouterBonSortie(this.bonSortie).subscribe({
        next: (response: BonSortie) => {
          this.bonSortie = response;
          this.clickButton('article-bon-sortie-form');
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

  public submitForm2(): void {

    this.clickButton('article-bon-sortie-form');

  }


  public submitArticleBonSortieForm(): void {
    // this.estSection &&  (this.bonPour.etatBonPour === this.RETOURSECTION) || (this.bonPour.etatBonPour === this.TERMINER

    if (this.bonSortie.identifiantBonSortie === "") {

      this.submitForm();

    }

    else{

      this.submitForm2();

    }




  }


  // un articleBonPour pour plusieur bonSortie et un bonSortie pour un articleBonSortie
  nombreArticleBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[], articleBonSorties: ArticleBonSortie[]): number {

    // rechercher l'articleBonPour dans les bonSorties
    const bonSortiesTrouves: BonSortie[] = bonSorties.filter(
      bonSortie =>
        bonSortie &&
        bonSortie.codeArticleBonPour &&
        articleBonPour.identifiantBonPour === bonSortie.codeArticleBonPour.identifiantBonPour &&
        articleBonPour.codeArticleBonPour === bonSortie.codeArticleBonPour.codeArticleBonPour
    ).sort((a, b) => a.identifiantBonSortie.localeCompare(b.identifiantBonSortie));

    // console.log(bonSortiesTrouves);


    if (bonSortiesTrouves.length > 0) {

      // recuperer le dernier bonSortie enregistrer s'il existe
      this.bonSortie = bonSortiesTrouves[bonSortiesTrouves.length - 1];

      if (this.bonPour.etatBonPour == EtatBonPour.TERMINER) {
        this.bonSortie = new BonSortie();
        // this.nombreArticle = this.nombreArticle - 1;
      }


      // Définir une fonction de filtrage pour trouver les ArticleBonSortie associés à un bon de sortie spécifique
      const trouverArticleBonSortiesPourBonSortie = (bonSortie: BonSortie, articleBonSorties: ArticleBonSortie[]) => {
        // return articleBonSorties.filter(article => article.identifiantBonSortie === bonSortie.identifiantBonSortie);
        return articleBonSorties.filter(article => article.identifiantBonSortie === bonSortie.identifiantBonSortie);
      };

      // Liste pour stocker tous les ArticleBonSortie associés aux bons de sortie trouvés
      const tousLesArticleBonSortieAssocies: ArticleBonSortie[] = [];

      // Parcourir tous les bons de sortie trouvés
      bonSortiesTrouves.forEach(bonSortieAssocie => {
        // Trouver les ArticleBonSortie associés à ce bon de sortie et les ajouter à la liste
        const articleBonSortieAssocies: ArticleBonSortie[] = trouverArticleBonSortiesPourBonSortie(bonSortieAssocie, articleBonSorties);
        // Ajouter les ArticleBonSortie trouvés à la liste

        tousLesArticleBonSortieAssocies.push(...articleBonSortieAssocies);
      });



      // tousLesArticleBonSortieAssocies.sort((a, b) => a.identifiantBonSortie.localeCompare(b.identifiantBonSortie))


      let nombreArticle: number = 0;

      tousLesArticleBonSortieAssocies.forEach(articleBonSortieAssocie => {
        if (articleBonSortieAssocie.quantiteAccordeeDefinitive !== 0 && articleBonSortieAssocie.quantiteAccordeeDefinitive !== null) {
          nombreArticle++;
        } else {
          this.articleBonSortie = articleBonSortieAssocie;
        }
      });



      if (this.articleBonSortie.identifiantBonSortie !== "" || this.bonPour.etatBonPour === EtatBonPour.TERMINER || this.bonPour.etatBonPour === EtatBonPour.RETOURSECTION) {
        nombreArticle++;
      }

      return nombreArticle;
    }

    return 1; // pas encore de bonSortie car pas trouver de bonSortie
  }





  // --------------------------------------------------------------------------
  public ajouterArticleBonSortie(ArticleBonSortieForm: NgForm): void {

    if (this.estSection) {

      let quantiteAccordee: number = ArticleBonSortieForm.value.quantiteAccordeeSection;

      let quantitePermise: number = this.articleBonPour.quantiteDemandee - this.quantiteAccordeeTotal;

      if (quantitePermise < quantiteAccordee) {
        this.sendNotification(NotificationType.ERROR, `Vous avez dépassé la limite de quantité permise (${quantitePermise}) véhicule(s)`);
        return;
      }

      let articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

      articleBonSortie.quantiteAccordeeSection = quantiteAccordee;
      articleBonSortie.quantiteAccordeeBLM = null;
      articleBonSortie.quantiteAccordeeDLF = null;
      articleBonSortie.quantiteAccordeeDefinitive = null;
      articleBonSortie.libelleArticleBonSortie = "LIBELLE " + quantiteAccordee + " BS";
      //this.articleBonSortie.identifiantBonSortie= this.bonSortie.identifiantBonSortie;
      articleBonSortie.codeArticleBonSortie = this.nombreArticle;
      articleBonSortie.dateArticleBonSortie = null;
      articleBonSortie.matriculeAgent = this.agents[0];
      articleBonSortie.identifiantBonSortie = this.bonSortie.identifiantBonSortie;



      // this.popupVehicule( this.articleBonPour, this.articleBonSortie,this.bonSortie);

      this.subscriptions.push(this.articleBonSortieService.ajouterArticleBonSortie(articleBonSortie).subscribe({
        next: (response: ArticleBonSortie) => {
          this.articleBonSortie = response;
          console.log(response);
          // this.sendNotification(NotificationType.SUCCESS, `Bon pour transmis`);
          this.transmettreBonPour(this.bonPour);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
      );


    }


    if (this.estBLM && this.articleBonSortie.identifiantBonSortie !== "") {

      let quantiteAccordee: number = ArticleBonSortieForm.value.quantiteAccordeeBLM;

      let quantitePermise: number = this.articleBonPour.quantiteDemandee - this.quantiteAccordeeTotal;

      if (quantitePermise < quantiteAccordee) {
        this.sendNotification(NotificationType.ERROR, `Vous avez dépassé la limite de quantité permise (${quantitePermise}) véhicule(s)`);
        return;
      }

      // let articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

      this.articleBonSortie.quantiteAccordeeBLM= quantiteAccordee;

      this.articleBonSortie.quantiteAccordeeDLF = null;
      this.articleBonSortie.quantiteAccordeeDefinitive = null;

      // console.log(this.bonSortie);
      // console.log(this.articleBonSortie);

      // this.popupVehicule( this.articleBonPour, this.articleBonSortie,this.bonSortie);

      this.subscriptions.push(this.articleBonSortieService.modifierArticleBonSortie(this.articleBonSortie).subscribe({
        next: (response: ArticleBonSortie) => {
          this.articleBonSortie = response;
          console.log(response);
          // this.sendNotification(NotificationType.SUCCESS, `Bon pour transmis`);
          this.transmettreBonPour(this.bonPour);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
      );


    }


    if (this.estDLF && this.articleBonSortie.identifiantBonSortie !== ""){

      let quantiteAccordee: number = ArticleBonSortieForm.value.quantiteAccordeeDLF;

      let quantitePermise: number = this.articleBonPour.quantiteDemandee - this.quantiteAccordeeTotal;

      if (quantitePermise <  quantiteAccordee ) {
        this.sendNotification(NotificationType.ERROR, `Vous avez dépassé la limite de quantité permise (${quantitePermise}) véhicule(s)`);
        return ;
      }

     this.articleBonSortie.quantiteAccordeeDLF= quantiteAccordee;

      this.articleBonSortie.quantiteAccordeeDefinitive= quantiteAccordee;

      //this.articleBonSortie.libelleArticleBonSortie= "LIBELLE " + quantiteAccordee + " BS";
      //this.articleBonSortie.identifiantBonSortie= this.bonSortie.identifiantBonSortie;
     // this.articleBonSortie.codeArticleBonSortie= this.nombreArticle;
     // this.articleBonSortie.dateArticleBonSortie = null;
      //this.articleBonSortie.matriculeAgent= this.agents[0];
      // this.articleBonSortie.codeArticleBonSortie= ArticleBonSortieForm.value.codeArticleBonSortie;
      // console.log(this.articleBonPour,this.articleBonSortie);
      console.log(this.articleBonSortie);

      this.popupVehicule( this.articleBonPour, this.articleBonSortie,this.bonSortie,this.bonPour);
    }





  }

 public transmettreBonPour(bonpour: BonPour): void {


    if (this.estSection) {

      this.bonPour.etatBonPour = this.etatSuivant(EtatBonPour.RETOURSECTION); // this.bonPour.etatBonPour


    }


    if (this.estBLM) {

      this.bonPour.etatBonPour = this.etatSuivant(EtatBonPour.RETOURBLM); // this.bonPour.etatBonPour


    }

    if (this.estBLM) {

      this.bonPour.etatBonPour = this.etatSuivant(EtatBonPour.RETOURBLM); // this.bonPour.etatBonPour


    }


    // -----------------------------------------------------------------------------

    this.subscriptions.push(this.bonPourService.modifierBonPour(this.bonPour).subscribe({
      next: (response: BonPour) => {
        // console.log(response);
        this.sendNotification(NotificationType.SUCCESS, `Bon pour transmis`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        // this.sendNotification(NotificationType.ERROR, errorResponse.error);
      }
    })
    );
  }


  // pas bon : ArticleBonSortieByIdentifiantBonSortie xxxxxxxxxxxxxx remplacer par nombreArticleBonSortie
  // ArticleBonSortieByIdentifiantBonSortie(articleBonPour: ArticleBonPour): ArticleBonSortie {
  //   const bonSortie = this.bonSorties.find(bonSortie => bonSortie.codeArticleBonPour.identifiantBonPour === articleBonPour.identifiantBonPour);

  //  if (bonSortie) {

  //   this.bonSortie = bonSortie;
  //   // console.log(bonSortie.identifiantBonSortie);

  //   this.articleBonSortie = this.articleBonSorties.find(article => article.identifiantBonSortie === bonSortie.identifiantBonSortie) ?? new ArticleBonSortie();

  //     return this.articleBonSorties.find(article => article.identifiantBonSortie === bonSortie.identifiantBonSortie) ?? new ArticleBonSortie();
  //   }

  //   return new ArticleBonSortie();

  // }



  // -----------------------------------------------------------------------------



  popupVehicule(articleBonPour: ArticleBonPour, articleBonSortie: ArticleBonSortie, bonSortie: BonSortie,bonPour:BonPour): void {
    const dialogRef = this.matDialog.open(
      VehiculeAjouterDotationComponent,
      {
        width: '80%',
        // height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          articleBonPour: articleBonPour,
          articleBonSortie: articleBonSortie,
          bonSortie: bonSortie,
          bonPour: bonPour
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
      if (dialogRef.componentInstance instanceof VehiculeAjouterDotationComponent) {
        const retour: Boolean = dialogRef.componentInstance.retour;

        if (!retour) {
          this.popupFermer();
        }

      }
      // ----------------------------------
    });
  }



}


