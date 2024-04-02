import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import * as Base64 from 'base64-js';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Prestataires } from 'src/app/model/prestataires.model';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { MatDialog } from '@angular/material/dialog';
import { MyDate } from 'src/app/model/my-date.model';
import { MyDateService } from 'src/app/services/my-date.service';
import { ReceptionVehiculeListeDetailComponent } from '../../reception/reception-vehicule-liste-detail/reception-vehicule-liste-detail.component';
import { ConsultationVehiculeDetailComponent } from '../consultation-vehicule-detail/consultation-vehicule-detail.component';

@Component({
  selector: 'app-consultation-reception-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './consultation-reception-vehicule-detail.component.html',
  styleUrl: './consultation-reception-vehicule-detail.component.css'
})
export class ConsultationReceptionVehiculeDetailComponent implements OnInit, OnDestroy {


  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();

  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree | undefined;

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree | undefined;

  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
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
    // "rowNumber",
    // "rowMarque",
    // "modele",
    "numeroSerie",
    "numeroImmatriculation",
    "rowPays",
    "numeroCarteGrise",
    "dateMiseEnCirculation",
    "rowTypeVehicule",
  ];
  dataSource = new MatTableDataSource<Vehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    // "rowCodeArticleBonEntree",
    "rowNumber",
    "rowLibelleArticleBonEntree",
    // "rowMarque",
    // "modele",
    "numeroSerie",
    "numeroImmatriculation",
    // "rowEtat",
    "rowTypeEnergie",
    "rowPays",
    "numeroCarteGrise",
    "dateMiseEnCirculation",
    "rowTypeVehicule",
  ];
  displayedColumnsCustom: string[] = [
    // "N°",
    "N°",
    "Libelle article",
    // "Marque",
    // "Modèle",
    "N° série",
    "N° immatriculation",
    // "Etat véhicule",
    "Type énergie",
    "Provenance",
    "N° carte grise",
    "Date mise en circulation",
    "Type véhicule"

  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private bonEntreeService: BonEntreeService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private vehiculeService: VehiculeService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private prestatairesService: PrestatairesService,
    private securiteService: SecuriteService,
    private myDateService: MyDateService
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {

    this.listeArticles();

    // --------------------------------------------------------------------------------
    const id = this.route.snapshot.paramMap.get('identifiantBE') ?? '';

    const decrypt = this.securiteService.decryptUsingAES256(id);

    // console.log(id); 
    // console.log(decrypt);



    if (decrypt) {
      // this.utilisateurService.getUtilisateurByUtilisateurId(+utilisateurId).subscribe(pokemon => this.pokemon = pokemon);
      this.subscriptions.push(this.bonEntreeService.recupererBonEntreeById(decrypt).subscribe({
        next: (response: BonEntree) => {
          this.bonEntree = response;
          // console.log(this.bonEntree);
          this.listeVehicules();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      }));
    }
    // --------------------------------------------------------------------------------
  }


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
  public listeArticles(): void {

    const subscription = this.articleBonEntreeService.listeArticleBonEntrees().subscribe({
      next: (response: ArticleBonEntree[]) => {
        this.articleBonEntrees = response;
        // this.listeVehicules();
        this.listeBonEntrees();
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
  public listeBonEntrees(): void {

    const subscription = this.bonEntreeService.listeBonEntrees().subscribe({
      next: (response: BonEntree[]) => {
        this.bonEntrees = response;

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------
  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {

        // console.log(response);

        this.vehicules = response;
        // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
        // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

        if (this.bonEntree) {
          this.filtreVehiculeBonEntree(this.vehicules, this.bonEntree);
        } else {
          console.error('bonEntree is undefined');
        }



      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  // --------------------------------------------------------------------------


  nombreArticleBonEntree(bonEntree: BonEntree, articleBonEntrees: ArticleBonEntree[]): number {
    let nombreArticleBonEntree = 0;

    for (const articleBonEntree of articleBonEntrees) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (bonEntree && articleBonEntree.identifiantBE && JSON.stringify(bonEntree) === JSON.stringify(articleBonEntree.identifiantBE)) {
        nombreArticleBonEntree++;
      }
    }

    return nombreArticleBonEntree;
  }



  filtreVehiculeBonEntree(vehicules: Vehicule[], bonEntree: BonEntree): void {

    this.rowNumber = 1;

    vehicules = vehicules.filter((vehicule: Vehicule) => {
      return vehicule.codeArticleBonEntree && bonEntree.identifiantBE && vehicule.codeArticleBonEntree.identifiantBE === bonEntree.identifiantBE;
    });



    // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
    this.dataSource = new MatTableDataSource<Vehicule>(vehicules.map((item) => ({
      ...item,
      // vehicule: [] as Vehicule[],
      rowMarque: item.codeMarque.libelleMarqueVH,
      rowPays: item.codePays.libellePays,
      // rowEtat: item.libelleEtat,
      rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
      rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule,
      rowCodeArticleBonEntree: item.codeArticleBonEntree.codeArticleBonEntree,
      rowLibelleArticleBonEntree: item.codeArticleBonEntree.libelleArticleBonEntree,
      rowNumber: this.rowNumber++,
    }))
    // .sort((a, b) => a.rowCodeArticleBonEntree.localeCompare(b.rowCodeArticleBonEntree))
    );


    // console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }




  popupDetail(vehicule: Vehicule): void {
    const dialogRef = this.matDialog.open(
      ConsultationVehiculeDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: vehicule
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
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

}
