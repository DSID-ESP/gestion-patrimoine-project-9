import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { Pays } from 'src/app/model/pays.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeObjet } from 'src/app/model/type-objet.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { MarqueVehicule } from 'src/app/model/marque-vehicule.model';
import { TypeVehicule } from 'src/app/model/type-vehicule.model';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { Agent } from 'src/app/model/agent.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { TypeObjetService } from 'src/app/services/type-objet.service';
import { AgentService } from 'src/app/services/agent.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { ActivatedRoute } from '@angular/router';
import { SecuriteService } from 'src/app/services/securite.service';
import { TypeEnergie } from 'src/app/model/type-energie.model';
import { TypeVehiculeService } from 'src/app/services/type-vehicule.service';
import { TypeEnergieService } from 'src/app/services/type-energie.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { MarqueVehiculeService } from 'src/app/services/marque-vehicule.service';
import { PaysService } from 'src/app/services/pays.service';
import { MyDate } from 'src/app/model/my-date.model';
import { ReceptionVehiculeListeDetailComponent } from '../reception-vehicule-liste-detail/reception-vehicule-liste-detail.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { LieuStockageVehicule } from 'src/app/model/lieu-stockage-vehicule.model';
import { LieuStockageVehiculeService } from 'src/app/services/lieu-stockage-vehicule.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-reception-vehicule-ajouter-article',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './reception-vehicule-ajouter-article.component.html',
  styleUrl: './reception-vehicule-ajouter-article.component.css'
})
export class ReceptionVehiculeAjouterArticleComponent implements OnInit, OnDestroy {

  // ----------------------------------------------------------------------------------
  modelDate: NgbDateStruct | null = null;

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

  nombreArticle: number = 0;
  // codeArticleBonEntree: number = 0;

  // libelleTypeObjet: string = '';


  // onCodeTypeObjetChange(typeObjet: TypeObjet): void {
  //   this.libelleTypeObjet = typeObjet?.libelleTypeObjet;
  // }

  // --------------------------------------------

  public typeVehicules: TypeVehicule[] = [];
  public typeVehicule: TypeVehicule = new TypeVehicule();

  public lieuStockageVehicules: LieuStockageVehicule[] = [];
  public lieuStockageVehicule: LieuStockageVehicule = new LieuStockageVehicule();



  public typeEnergies: TypeEnergie[] = [];
  public typeEnergie: TypeEnergie = new TypeEnergie();


  public marqueVehicules: MarqueVehicule[] = [];
  public marqueVehicule: MarqueVehicule = new MarqueVehicule();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree = new ArticleBonEntree();

  public pays: Pays[] = [];
  public LePays: Pays = new Pays();


  public typeObjets: TypeObjet[] = [];
  public typeObjet: TypeObjet = new TypeObjet();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();


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
    "dateMiseEnCirculation"
  ];
  columnsToHide: string[] = [
    "numeroImmatriculation",
    "typeEnergie",
    "numeroCarteGrise",
    "rowTypeVehicule",
    "codeUniteDouaniere"
  ];
  dataSource = new MatTableDataSource<Vehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "numeroSerie",
    "numeroImmatriculation",
    "rowTypeEnergie",
    "rowPays",
    "numeroCarteGrise",
    "dateMiseEnCirculation",
    "rowTypeVehicule",
    "rowMarque"
  ];
  displayedColumnsCustom: string[] = [
    "N° serie",
    "N° immatriculation",
    "Type energie",
    "Provenance",
    "N° carte grise",
    "Date mise en circulation",
    "Type vehicule",
    "Marque"
  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private datePipe: DatePipe,
    private typeVehiculeService: TypeVehiculeService,
    private typeEnergieService: TypeEnergieService,
    private lieuStockageVehiculeService: LieuStockageVehiculeService,
    private marqueVehiculeService: MarqueVehiculeService,
    private uniteDouaniereService: UniteDouaniereService,
    private paysService: PaysService,
    private typeObjetService: TypeObjetService,
    private agentService: AgentService,
    private vehiculeService: VehiculeService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private bonEntreeService: BonEntreeService,
    private route: ActivatedRoute,
    private securiteService: SecuriteService,
    @Inject(MAT_DIALOG_DATA) public bonEntree: BonEntree,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ReceptionVehiculeAjouterArticleComponent>
  ) { }


  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listeTypeVehicules();
    this.listeTypeEnergies();
    this.listeLieuStockageVehicules();
    this.listeMarqueVehicules();
    this.listeUniteDouanieres();
    this.listePays();
    // this.listeVehicules();
    this.listeTypeObjets();
    this.listeAgents();
    this.listeArticleBonEntrees();
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeArticleBonEntrees(): void {

    const subscription = this.articleBonEntreeService.listeArticleBonEntrees().subscribe({
      next: (response: ArticleBonEntree[]) => {
        this.articleBonEntrees = response;
        // console.log(this.articleBonEntrees);

        this.nombreArticle = this.nombreArticleBonEntree(this.bonEntree, this.articleBonEntrees);
        //this.codeArticleBonEntree =  this.nombreArticle;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  public listeLieuStockageVehicules(): void {

    const subscription = this.lieuStockageVehiculeService.listeLieuStockageVehicules().subscribe({
      next: (response: LieuStockageVehicule[]) => {
        this.lieuStockageVehicules = response;
        // console.log(this.articleBonEntrees);


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
  public listeTypeObjets(): void {

    const subscription = this.typeObjetService.listeTypeObjets().subscribe({
      next: (response: TypeObjet[]) => {
        this.typeObjets = response;
        // console.log(this.typeObjets);

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
  public listeTypeVehicules(): void {

    const subscription = this.typeVehiculeService.listeTypeVehicules().subscribe({
      next: (response: TypeVehicule[]) => {
        this.typeVehicules = response;
        // console.log(this.typeVehicules);

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
  public listeTypeEnergies(): void {

    const subscription = this.typeEnergieService.listeTypeEnergies().subscribe({
      next: (response: TypeEnergie[]) => {
        this.typeEnergies = response;
        // console.log(this.typeEnergies);

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
  public listeMarqueVehicules(): void {

    const subscription = this.marqueVehiculeService.listeMarqueVehicules().subscribe({
      next: (response: MarqueVehicule[]) => {
        this.marqueVehicules = response;
        // console.log(this.marqueVehicules);

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
        // console.log(this.uniteDouanieres);

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
  public listePays(): void {

    const subscription = this.paysService.listePays().subscribe({
      next: (response: Pays[]) => {
        this.pays = response;
        // console.log(this.pays);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  // nombreArticleBonEntree(bonEntree: BonEntree, articleBonEntrees: ArticleBonEntree[]): number {
  //   let nombreArticleBonEntree = 2;

  //   for (const articleBonEntree of articleBonEntrees) {
  //     // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
  //     if (bonEntree && articleBonEntree.codeArticleBonEntree && JSON.stringify(bonEntree) === JSON.stringify(articleBonEntree.codeArticleBonEntree)) {
  //       nombreArticleBonEntree++;
  //     }
  //   }

  //   return nombreArticleBonEntree;
  // }

  nombreArticleBonEntree(bonEntree: BonEntree, articleBonEntrees: ArticleBonEntree[]): number {
      const matchingArticles = articleBonEntrees.filter(article => bonEntree && article.codeArticleBonEntree && bonEntree.identifiantBE === article.identifiantBE);
      return matchingArticles.length + 1;
  }



  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour executer ajouterBonEntree
  public submitVehiculeForm(): void {
    this.clickButton('vehicule-form')
  }

  public ajouterVehicule(VehiculeForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 2
    const dateMiseEnCirculation: MyDate = VehiculeForm.value.dateMiseEnCirculation;
    const formattedDate = this.vehiculeService.formatterMyDate(dateMiseEnCirculation);

    if (formattedDate) {
      VehiculeForm.value.dateMiseEnCirculation = formattedDate;
    }

    this.vehicule = VehiculeForm.value;
    this.validerArticleBonEntree();
  }
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------

  // pour executer ajouterBonEntree
  public submitArticleBonEntreeForm(): void {
    this.clickButton('article-bon-entree-form')
  }

  public ajouterArticleBonEntree(ArticleBonEntreeForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 2


    // AGENT
    ArticleBonEntreeForm.value.matriculeAgent = this.agents[0];

    ArticleBonEntreeForm.value.codeArticleBonEntree = this.nombreArticle;

    ArticleBonEntreeForm.value.quantiteEntree = 1;

    this.articleBonEntree = ArticleBonEntreeForm.value;

    // BON ENTREE
    this.articleBonEntree.identifiantBE = this.bonEntree.identifiantBE;

    console.log(ArticleBonEntreeForm.value);

    this.submitVehiculeForm();
  }


  validerArticleBonEntree(): void {
    const marque: string = this.vehicule.codeMarque.libelleMarqueVH;
    const model: string = this.vehicule.modele;
    const numeroSerie: string = this.vehicule.numeroSerie;
    this.articleBonEntree.libelleArticleBonEntree = `${marque}-${model}-${numeroSerie}`;

    console.log(this.articleBonEntree);

    this.subscriptions.push(this.articleBonEntreeService.ajouterArticleBonEntree(this.articleBonEntree).subscribe({
        next: (response: ArticleBonEntree) => {
          console.log(response);
          this.articleBonEntree = response;
          this.validerVehicule();
          // ArticleBonEntreeForm.reset();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }

  validerVehicule(): void {

    this.vehicule.codeArticleBonEntree = this.articleBonEntree;

    this.subscriptions.push(this.vehiculeService.ajouterVehicule(this.vehicule).subscribe({
      next: (response: Vehicule) => {
        console.log(response);
        // VehiculeForm.reset();
        // window.location.reload();
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussi`);
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    })
  );
  }



  popupFermer(): void {
    this.dialogRef.close();
  }


  // pour envoyer tous les formulaires
  public submitFormVehicule(): void {
    this.submitArticleBonEntreeForm();
    // this.submitVehiculeForm();
  }




}

