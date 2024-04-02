import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import * as Base64 from 'base64-js';
import { SecuriteService } from 'src/app/services/securite.service';
import { ReceptionVehiculeAjouterBonEntreeComponent } from '../../reception/reception-vehicule-ajouter-bon-entree/reception-vehicule-ajouter-bon-entree.component';

@Component({
  selector: 'app-consultation-reception-vehicule-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './consultation-reception-vehicule-liste.component.html',
  styleUrl: './consultation-reception-vehicule-liste.component.css'
})
export class ConsultationReceptionVehiculeListeComponent implements OnInit, OnDestroy {

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule | undefined;

  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree | undefined;

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree | undefined;

  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  focusOnInput: boolean = false;

  @ViewChild('monDiv', { static: true }) monDiv: ElementRef | undefined;

  divClique(): void {
    // Code à exécuter lorsque l'élément <div> est cliqué
    // Par exemple, vous pouvez modifier une variable ou déclencher une action
    // console.log('L\'élément <div> a été cliqué !');
    this.focusOnInput = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // Vérifie si le clic a eu lieu en dehors de l'élément monDiv
    if (!this.monDiv?.nativeElement.contains(event.target)) {
      // Code à exécuter lorsque le clic est en dehors de monDiv
      // console.log('Clic en dehors de monDiv détecté.');
      this.focusOnInput = false;
    }
  }
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  @ViewChild('myInputSearch') myInputSearch!: ElementRef;
  // rechercher
  searchTerms = new Subject<string>();
  bonEntrees$: Observable<BonEntree[]> = of();
  // recherche custom
  searchTermsFilterDoublenumeroBELibelleBonEntree = new Subject<string>();
  termeRecherchenumeroBELibelleBonEntree: string = "";
  bonEntreeFilterDoublenumeroBELibelleBonEntree$: Observable<BonEntree[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [

    "dateBonEntree"
  ];
  columnsToHide: string[] = [
    "observationBonEntree",
    "identifiantBL"
    // "dateEnregistrement",
    // "matriculeAgent",
    // "codeSection"
  ];
  dataSource = new MatTableDataSource<BonEntree>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "numeroBE",
    "libelleBonEntree",
    "dateBonEntree",
    "observationBonEntree",
    "rowNombreArticleBonEntree"
  ];
  displayedColumnsCustom: string[] = [
    "N° bon d\'entrée",
    "Libellé bon d\'entrée",
    "Date bon d\'entrée",
    "Observation bon d\'entrée",
    "Articles"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    private vehiculeService: VehiculeService,
    private bonEntreeService: BonEntreeService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private securiteService: SecuriteService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // this.listeVehicules();
    this.listeArticles();
    // this.listeBonEntrees();

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.bonEntrees$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.bonEntreeService.searchBonEntreeList(term, this.bonEntrees))
      // {.....List(ab)............List(abc)......}
    );
    this.bonEntreeFilterDoublenumeroBELibelleBonEntree$ = this.searchTermsFilterDoublenumeroBELibelleBonEntree.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.bonEntreeService.searchBonEntreeListFilterDouble(term, this.bonEntrees))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: BonEntree[] = this.dataSource.filteredData;
    // console.log(data);


    const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: BonEntree) => [
      // item.numeroBE,
      item.libelleBonEntree,
      `${new Date(item.dateBonEntree.toString()).getDate()} ${months[new Date(item.dateBonEntree.toString()).getMonth()]} ${new Date(item.dateBonEntree.toString()).getFullYear() % 100}`,
      item.observationBonEntree,
      // item.rowNombreArticleBonEntree
    ]);

    // Configuration pour le PDF avec une taille de page personnalisée

    const marginLeft = 10;
    const marginTop = 10;
    const marginRight = 10;
    const marginBottom = 10;

    // Générer le tableau dans le PDF avec des styles de texte personnalisés
    autoTable(doc, {
      head: [
        [
          // { content: 'N° bon d\'entrée', styles: { fontSize: 6 } },
          { content: 'Libelle bon d\'entrée', styles: { fontSize: 6 } },
          { content: 'Date bon d\'entrée', styles: { fontSize: 6 } },
          { content: 'Observation bon d\'entrée', styles: { fontSize: 6 } },
          // { content: 'Articles', styles: { fontSize: 6 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('bon-entree-liste.pdf');
  }


  search(term: string): void {
    this.termeRecherchenumeroBELibelleBonEntree = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoublenumeroBELibelleBonEntree.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoublenumeroBELibelleBonEntree(termeRecherchenumeroBELibelleBonEntree: string) {
    this.termeRecherchenumeroBELibelleBonEntree = termeRecherchenumeroBELibelleBonEntree;
    this.myInputSearch.nativeElement.value = termeRecherchenumeroBELibelleBonEntree;
    this.dataSource.filter = termeRecherchenumeroBELibelleBonEntree.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRecherchenumeroBELibelleBonEntree: string): boolean {
    return !isNaN(Number(termeRecherchenumeroBELibelleBonEntree))
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  // public listeVehicules(): void {

  //   const subscription = this.vehiculeService.listeVehicules().subscribe({
  //     next: (response: Vehicule[]) => {

  //       this.vehicules = response;
  //       // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
  //       // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

  //       // recuperer la liste des bon entrees qui se trouvent dans la liste de vehicules
  //       this.filtreBonEntreeVehicule(this.vehicules, this.articleBonEntrees);

  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }
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

        this.dataSource = new MatTableDataSource<BonEntree>(this.bonEntrees.map((item) => ({
          ...item,
          raisonSociale: item.identifiantBL.ninea ? item.identifiantBL.ninea.raisonSociale : '---',
          rowNombreArticleBonEntree: this.nombreArticleBonEntree(item, this.articleBonEntrees)
        })).sort((a, b) => a.rowNombreArticleBonEntree - b.rowNombreArticleBonEntree));

        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  popupAjouterBordereauLivraisonBonEntree(): void {
    const dialogRef = this.matDialog.open(
      ReceptionVehiculeAjouterBonEntreeComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  goToDetail(bonEntree: BonEntree): void {
    const id = bonEntree.identifiantBE;
    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/consultation-reception-vehicule-detail', encrypt]);
  }




  // filtreBonEntreeVehicule(vehicules: Vehicule[], articleBonEntrees: ArticleBonEntree[]): void {


  //   const listeBonEntree: BonEntree[] = vehicules.map((vehicule: Vehicule) => vehicule.identifiantBE.identifiantBE);
  //   // Supprimer les doublons en se basant sur la propriété identifiantBE
  //   // const listeBonEntreeUnique: BonEntree[] = listeBonEntree.filter(
  //   //   (value, index, self) =>
  //   //     self.findIndex((item) => item.identifiantBE === value.identifiantBE) === index
  //   // );

  //   const listeBonEntreeUnique: BonEntree[] = listeBonEntree.filter(
  //     (elementActuel, indexActuel, tableauOriginal) =>
  //       tableauOriginal.findIndex((elementPrecedent) => elementPrecedent.identifiantBE === elementActuel.identifiantBE) === indexActuel
  //   );


  //   this.dataSource = new MatTableDataSource<BonEntree>(listeBonEntreeUnique.map((item) => ({
  //     ...item,
  //     rowNombreArticleBonEntree: this.nombreArticleBonEntree(item, articleBonEntrees)
  //   })).sort((a, b) => a.rowNombreArticleBonEntree - b.rowNombreArticleBonEntree));

  //   // console.log(this.dataSource.data);
  //   this.dataSource.paginator = this.paginator;
  // }


  nombreArticleBonEntree(bonEntree: BonEntree, articleBonEntrees: ArticleBonEntree[]): number {
    let nombreArticleBonEntree = 0;

    for (const articleBonEntree of articleBonEntrees) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (bonEntree && articleBonEntree.identifiantBE && bonEntree.identifiantBE === articleBonEntree.identifiantBE) {
        nombreArticleBonEntree++;
      }
    }

    return nombreArticleBonEntree;
  }

}


