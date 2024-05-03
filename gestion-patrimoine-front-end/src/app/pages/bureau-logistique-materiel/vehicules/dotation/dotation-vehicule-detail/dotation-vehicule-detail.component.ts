import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { NgForm } from '@angular/forms';
import { Agent } from 'src/app/model/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { DotationVehiculeVehiculeAjouterComponent } from '../dotation-vehicule-vehicule-ajouter/dotation-vehicule-vehicule-ajouter.component';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { TypeObjet } from 'src/app/model/type-objet.model';
import { DotationVehiculeAjouterComponent } from '../dotation-vehicule-ajouter/dotation-vehicule-ajouter.component';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';

@Component({
  selector: 'app-dotation-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-detail.component.html',
  styleUrl: './dotation-vehicule-detail.component.css'
})
export class DotationVehiculeDetailComponent implements OnInit, OnDestroy {



  rowNumber!: number;

  quantiteAccordeeTotal!: number;
  //rowQuantiteAccorde!: number;




  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour = new ArticleBonPour();

  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

  public typeObjets: TypeObjet[] = [];
  public typeObjet: TypeObjet = new TypeObjet();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public bonPours: BonPour[] = [];
  public bonPour: BonPour = new BonPour();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere | undefined;

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public vehiculesSelect: Vehicule[] = [];

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();


  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [

  ];
  columnsToHide: string[] = [
  ];
  dataSource = new MatTableDataSource<ArticleBonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowNumber",
    // "codeArticleBonPour",
    "libelleArticleBonPour",
    "quantiteDemandee",
    "rowQuantiteAccorde",
    // "rowQuantiteAccorde",
    "rowCodeTypeObjet"


  ];
  displayedColumnsCustom: string[] = [
    "N°",
    // "Code article",
    "Description article bon pour",
    "Qte Demandée",
    "Qte Accordée Définitive",
    "Nature"


  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private bonSortieService: BonSortieService,
    private articleBonSortieService: ArticleBonSortieService,
    private vehiculeService: VehiculeService,
    private dotationVehiculeService: DotationVehiculeService,
    private agentService: AgentService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private typeUniteDouaniereService: TypeUniteDouaniereService,
    private uniteDouaniereService: UniteDouaniereService,
    private securiteService: SecuriteService,
    private myDateService: MyDateService
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {

    // this.listeArticles();
    // this.listeBonDeSorties();
    this.listeAgents();
    // this.listeDotations();
    this.listeVehicules();
    this.listeArticleBonSortie();
    // --------------------------------------------------------------------------------
    const id = this.route.snapshot.paramMap.get('identifiantBonPour') ?? '';
    // const codeArticleBonPour = this.route.snapshot.paramMap.get('codeArticleBonPour') ?? '';


    const decrypt = this.securiteService.decryptUsingAES256(id);

    // const decrypt2 = this.securiteService.decryptUsingAES256(codeArticleBonPour);


    // --------------------------------------------------------------------------------
    //  const identifiantBP = this.route.snapshot.paramMap.get('identifiantBP') ?? '';
    //  const decrypt = this.securiteService.decryptUsingAES256(identifiantBP);



    // console.log(decrypt);



    if (decrypt) {


      this.subscriptions.push(this.bonPourService.recupererBonPourById(decrypt).subscribe({
        next: (response: BonPour) => {
          this.bonPour = response;


          this.listeBonDeSorties();
          // this.listeArticleBonPours();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      }));
    }

  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeBonDeSorties(): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonSorties = response;
        // this.bonDeSortie = this.filtreBonPourArticleBonSortie(this.articleBonPour.identifiantBP, this.bonDeSorties);
        this.bonSortie = this.AfficherFormBonSortie(this.bonPour, this.bonSorties);
        // console.log(this.bonSortie);
        // console.log(this.bonPour);

        this.listeArticleBonPours();

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  public listeArticleBonSortie(): void {

    const subscription = this.articleBonSortieService.listeArticleBonSorties().subscribe({
      next: (response: ArticleBonSortie[]) => {
        this.articleBonSorties = response;
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
        //this.articleBonPours = response;

        const nomTypeObjet = "VEHICULES ET MATERIELS ROULANTS";
        this.articleBonPours =  response.filter(articleBonPour => articleBonPour.codeTypeObjet.libelleTypeObjet === nomTypeObjet)


        // this.articleBonPours = response.sort((a, b) => Number(a.quantiteDemandee) - Number(b.quantiteDemandee));

        if (this.bonPour && this.articleBonPours) {

          // this.filtreArticleBonPourByBonPour(this.articleBonPours, this.bonPour);

          let articleBonPoursListe: ArticleBonPour[] | undefined;

          articleBonPoursListe = this.articleBonPours.filter(articleBonPour => articleBonPour.identifiantBonPour === this.bonPour.identifiantBonPour);
          this.rowNumber = 1;

          articleBonPoursListe =  articleBonPoursListe.map((item) => ({
            ...item,
            rowCodeTypeObjet: item.codeTypeObjet.libelleTypeObjet,
            rowNumber: this.rowNumber++,
            rowQuantiteAccorde: this.quantiteAccordeeByIdentifiantBonSortie(item, this.bonSorties, this.articleBonSorties)
          }));

          this.dataSource = new MatTableDataSource<ArticleBonPour>(articleBonPoursListe.map((item) => ({
            ...item
          })));

          this.dataSource.paginator = this.paginator;

        } else {
          console.error('articleBonPours is undefined');
        }


      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  // filtreArticleBonPourByBonPour(articleBonPours: ArticleBonPour[], bonPour: BonPour): void {

  //   articleBonPours = this.articleBonPours.filter(articleBonPour => articleBonPour.identifiantBonPour === bonPour.identifiantBonPour);

  //   this.rowNumber = 1;

  //   articleBonPours =  articleBonPours.map((item) => ({
  //     ...item,
  //     rowCodeTypeObjet: item.codeTypeObjet.libelleTypeObjet,
  //     rowNumber: this.rowNumber++,
  //     rowQuantiteAccorde: this.quantiteAccordeeByIdentifiantBonSortie(item, this.bonSorties, this.articleBonSorties)
  //   }));


  //   this.dataSource = new MatTableDataSource<ArticleBonPour>(articleBonPours.map((item) => ({
  //     ...item
  //   })));

  //   this.dataSource.paginator = this.paginator;
  // }



  // quantiteAccordeeByIdentifiantBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[], articleBonSorties: ArticleBonSortie[]): number {


  //   const bonsSortiesAssocies = bonSorties.filter(bonSortie => articleBonPour.identifiantBonPour === bonSortie.identifiantBonPour.identifiantBonPour);

  //    console.log(bonSortie);
  //   console.log(articleBonPour);


  //   bonsSortiesAssocies.forEach(bonSortie => {
  //     // Filtrer les articles bon sortie associés à ce bon de sortie
  //     const articleBonSortie = articleBonSorties.filter(articleBonSortie => articleBonSortie.identifiantBonSortie === bonSortie.identifiantBonSortie);

  //     // Calculer la quantité totale accordée pour ces articles et l'ajouter à la quantité totale

  //     this.quantiteAccordeeTotal = articleBonSorties.reduce((total, articleBonSorties) => {
  //       return total + (articleBonSortie ? articleBonSortie.quantiteAccordeeDefinitive : 0);
  //     }, 0);
  //     return this.quantiteAccordeeTotal;
  // });



  //     this.quantiteAccordeeTotal = articleBonSorties.reduce((total, articleBonSortie) => {
  //       return total + (articleBonSortie ? articleBonSortie.quantiteAccordeeDefinitive : 0);
  //     }, 0);
  //     return this.quantiteAccordeeTotal;

  //   } else {
  //     return 0;
  //   }

  // }



  // quantiteAccordeeByIdentifiantBonSortie(articleBonPour: ArticleBonPour,articleBonSorties: ArticleBonSortie[]): number {



  //   // console.log(bonSortie);
  //   // console.log(articleBonPour);


  //   if (articleBonPour) {

  //     // console.log(articleBonSorties[0]?.identifiantBonSortie);
  //     // console.log(bonSortie.identifiantBonSortie);

  //     articleBonSorties = articleBonSorties.filter(articleBonSortie => articleBonSortie.identifiantBonSortie === articleBonPour.identifiantBonPour);



  //     // console.log(articleBonSorties);



  //     this.quantiteAccordeeTotal = articleBonSorties.reduce((total, articleBonSortie) => {
  //       return total + (articleBonSortie ? articleBonSortie.quantiteAccordeeDefinitive : 0);
  //     }, 0);
  //     return this.quantiteAccordeeTotal;

  //   } else {
  //     return 0;
  //   }

  // }


  quantiteAccordeeByIdentifiantBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[], articleBonSorties: ArticleBonSortie[]): number {
    // Filtrer les bons de sortie correspondant à l'identifiant de l'articleBonPour
    const bonsSortiesAssocies = bonSorties.filter(bonSortie => bonSortie.identifiantBonPour.identifiantBonPour === articleBonPour.identifiantBonPour);

    // Initialiser la quantité totale à 0
    this.quantiteAccordeeTotal = 0;

    // Parcourir les bons de sortie associés
    bonsSortiesAssocies.forEach(bonSortie => {
        // Filtrer les articles bon sortie associés à ce bon de sortie
        const articleBonSortieAssocies = articleBonSorties.filter(article => article.identifiantBonSortie === bonSortie.identifiantBonSortie);

        // Calculer la quantité totale accordée pour ces articles et l'ajouter à la quantité totale
        const quantitePourCeBonSortie = articleBonSortieAssocies.reduce((total, article) => {
            return total + (article && article.quantiteAccordeeDefinitive ? article.quantiteAccordeeDefinitive : 0);
        }, 0);

        this.quantiteAccordeeTotal += quantitePourCeBonSortie;
    });

    return this.quantiteAccordeeTotal;
}



  nombreArticleBonEntree(bonPour: BonPour, articleBonPours: ArticleBonPour[]): number {
    return articleBonPours.reduce((count, article) => {
      if (bonPour && article.identifiantBonPour && bonPour.identifiantBonPour === article.identifiantBonPour) {
        return count + 1;
      }
      return count;
    }, 1);
  }




  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {
        this.vehicules = response;
        // console.log(this.secteurActivites);

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

  AfficherFormBonSortie(bonPour: BonPour, bonSorties: BonSortie[]): BonSortie {


    for (const bonSortie of bonSorties) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (bonPour && bonSortie.identifiantBonPour && JSON.stringify(bonPour) === JSON.stringify(bonSortie.identifiantBonPour)) {

        return bonSortie;
      }

    }


    return new BonSortie();
  }


  // filtreBonPourArticleBonSortie(bonPour: BonPour, bonDeSorties: BonDeSortie[]): BonDeSortie {
  //   return bonDeSorties.find(bonDeSortie =>
  //       Array.isArray(bonDeSortie.identifiantBP) && bonDeSortie.identifiantBP.some(bp => bp === bonPour)
  //   ) ?? new BonDeSortie();
  // }



  myDateStringFormatter(date: MyDate | string | undefined | null): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

  // popupAjouterBonSortie(): void {
  //   const dialogRef = this.matDialog.open(
  //     DotationVehiculeAjouterBonSortieComponent,
  //     {
  //       width: '80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }



  goToDetail(bonSortie: BonSortie): void {
    const id = bonSortie.identifiantBonSortie;
    // console.log(id);

    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/dotation-vehicule-detail-bon-sortie-detail', encrypt]);
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {


    this.submitBonSortieForm();
    // this.submitBonEntreeForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }

  // pour executer ajouterBordereauLivraison
  public submitBonSortieForm(): void {
    this.clickButton('bon-sortie-form')
  }

  // recupererBonPourByIdentifiantBonPour(identifiantBonPour: string): BonPour | undefined {

  //   let bonPour: BonPour | undefined;

  //   // console.log(this.bonSorties);

  //   bonPour = this.bonPours.find(bonPour => bonPour.identifiantBonPour === identifiantBonPour);

  //   return bonPour
  // }


  public ajouterBonSortie(BonSortieForm: NgForm): void {

    //  AGENT
    BonSortieForm.value.numeroBonSortie = 'BS005';
    BonSortieForm.value.matriculeAgent = this.agents[0];
    BonSortieForm.value.identifiantBonPour = this.bonPour;

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


  // public listeDotations(): void {

  //   const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
  //     next: (response: DotationVehicule[]) => {

  //       this.dotationVehicules = response;

  //       // console.log(response);


  //       // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
  //       // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

  //       // this.rowNumber = 1;

  //       // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
  //       this.dataSource = new MatTableDataSource<DotationVehicule>(this.dotationVehicules.map((item) => ({
  //         ...item,

  //         rowQuantiteAccordee: item.identifiantBS.quantiteAccordee,
  //         // rowQuantiteDemandee: item.identifiantBS.identifiantBS.


  //         // vehicule: [] as Vehicule[],
  //         // rowMarque: item.codeMarque.libelleMarque,
  //         // rowPays: item.codePays.libellePays,
  //         // rowEtat: item.codeEtat.libelleEtat,
  //         // rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
  //         // rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule,
  //         // rowLibelleArticleBonEntree: item.identifiantBE.libelleArticleBonEntree,
  //         // rowNumber: this.rowNumber++,
  //       })));


  //       // console.log(this.dataSource.data);
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }


  popupAjouter(vehicules: Vehicule[], bonSortie: BonSortie, vehiculesSelect?: Vehicule[]): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeVehiculeAjouterComponent,
      {
        width: '80%',
        height: 'auto',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',

        data: {
          vehicules: vehicules,
          bonDeSortie: bonSortie,
          vehiculesSelected: vehiculesSelect
        }
      }

    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
      // if (dialogRef.componentInstance instanceof DotationVehiculeVehiculeAjouterComponent) {
      //   this.vehiculesSelect = dialogRef.componentInstance.vehiculesSelect;
      //   // console.log(this.secteurActivitesSelect);
      // }
      // ----------------------------------
      this.ngOnInit();
    });
  }


  popupAjouterDotationVehicule(articleBonPour: ArticleBonPour, quantiteAccordeeTotal: number, bonPour: BonPour): void {

    console.log(articleBonPour,quantiteAccordeeTotal);

    const dialogRef = this.matDialog.open(
      DotationVehiculeAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:  {
          articleBonPour: articleBonPour,
          quantiteAccordeeTotal: quantiteAccordeeTotal,
          bonpour: bonPour
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }





}
