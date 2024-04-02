import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { SecuriteService } from 'src/app/services/securite.service';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { DotationVehiculeAjouterComponent } from '../dotation-vehicule-ajouter/dotation-vehicule-ajouter.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dotation-vehicule-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-liste.component.html',
  styleUrl: './dotation-vehicule-liste.component.css'
})
export class DotationVehiculeListeComponent implements OnInit, OnDestroy {



  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour | undefined;

  public bonPours: BonPour[] = [];
  public bonPour: BonPour | undefined;

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public control = new FormControl('');
  public filteredUniteDouanieres: Observable<UniteDouaniere[]> | undefined;



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
  bonPours$: Observable<BonPour[]> = of();
  // recherche custom
  searchTermsFilterDoubleDateArriveBLMEtatBP = new Subject<string>();
  termeRechercheDateArriveBLMEtatBP: string = "";
  bonPourFilterDoubleDateArriveBLMEtatBP$: Observable<BonPour[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [
    "dateArriveDLF"
  ];
  columnsToHide: string[] = [
    // "nombreArme",
    // "nombreMateriel"

  ];
  dataSource = new MatTableDataSource<BonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "numeroCourrielOrigine",
    "etatBonPour",
    "dateArriveDLF",
    "rowNomUnite"

  ];
  displayedColumnsCustom: string[] = [

    "N° courrier origine",
    "Etat bon pour",
    "Date arrivéé DLF",
     "Unité"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    private articleBonPourService: ArticleBonPourService,
    private securiteService: SecuriteService,
    private bonPourService: BonPourService,
    private uniteDouaniereService: UniteDouaniereService,
    private matDialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.filteredUniteDouanieres = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.listeBonPours();
    this.listeUniteDouanieres();

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.bonPours$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.bonPourService.searchBonPourList(term, this.bonPours))
      // {.....List(ab)............List(abc)......}
    );
    this.bonPourFilterDoubleDateArriveBLMEtatBP$ = this.searchTermsFilterDoubleDateArriveBLMEtatBP.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.bonPourService.searchBonPourListFilterDouble(term, this.bonPours))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }

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


  // generatePDF(): void {

  //   const data: BonEntree[] = this.dataSource.filteredData;
  //   // console.log(data);


  //   const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

  //   const doc = new jsPDF();

  //   // Créez un tableau de données pour autoTable
  //   const tableData = data.map((item: BonEntree) => [
  //     item.numeroBE,
  //     item.libelleBonEntree,
  //     `${new Date(item.dateBonEntree.toString()).getDate()} ${months[new Date(item.dateBonEntree.toString()).getMonth()]} ${new Date(item.dateBonEntree.toString()).getFullYear() % 100}`,
  //     item.observationBonEntree,
  //     item.rowNombreArticleBonEntree
  //   ]);

  //   // Configuration pour le PDF avec une taille de page personnalisée

  //   const marginLeft = 10;
  //   const marginTop = 10;
  //   const marginRight = 10;
  //   const marginBottom = 10;

  //   // Générer le tableau dans le PDF avec des styles de texte personnalisés
  //   autoTable(doc, {
  //     head: [
  //       [
  //         { content: 'N° bon d\'entrée', styles: { fontSize: 6 } },
  //         { content: 'Libelle bon d\'entrée', styles: { fontSize: 6 } },
  //         { content: 'Date bon d\'entrée', styles: { fontSize: 6 } },
  //         { content: 'Observation bon d\'entrée', styles: { fontSize: 6 } },
  //         { content: 'Articles', styles: { fontSize: 6 } }
  //       ]
  //     ],
  //     body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
  //     margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
  //     theme: 'plain'
  //   });

  //   doc.save('bon-entree-liste.pdf');
  // }


  private _filter(value: string): UniteDouaniere[] {
    // const filterValue = this._normalizeValue(value);
    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    return this.uniteDouanieres.filter(uniteDouaniere => this._normalizeValue(uniteDouaniere.nomUniteDouaniere).includes(value));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  search(term: string): void {
    this.termeRechercheDateArriveBLMEtatBP = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleDateArriveBLMEtatBP.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleDateArriveBLMEtatBP(termeRechercheDateArriveBLMEtatBP: string) {
    this.termeRechercheDateArriveBLMEtatBP = termeRechercheDateArriveBLMEtatBP;
    this.myInputSearch.nativeElement.value = termeRechercheDateArriveBLMEtatBP;
    this.dataSource.filter = termeRechercheDateArriveBLMEtatBP.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheDateArriveBLMEtatBP: string): boolean {
    return !isNaN(Number(termeRechercheDateArriveBLMEtatBP))
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

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------




  public listeBonPours(): void {

    const subscription = this.bonPourService.listeBonPours().subscribe({
      next: (response: BonPour[]) => {
        this.bonPours = response;

        this.dataSource = new MatTableDataSource<BonPour>(this.bonPours.map((item) => ({
          ...item,

           // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

          rowNomUnite: item.codeUniteDouaniere.nomUniteDouaniere,

        })));

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


  popupAjouterDotation(): void {
    // this.router.navigate(['/dotation-vehicule-detail', '', '']);
  }




  // goToDetail(articleBonPour: ArticleBonPour): void {
  //   const identifiantBP = articleBonPour.identifiantBP.identifiantBP;
  //   const codeArticleBonPour = articleBonPour.codeArticleBonPour;

  //   const encrypt1 = this.securiteService.encryptUsingAES256(identifiantBP);
  //   const encrypt2 = this.securiteService.encryptUsingAES256(codeArticleBonPour);

  //   this.router.navigate(['/dotation-vehicule-detail', encrypt1, encrypt2]);
  // }

  // goToDetail(bonEntree: BonEntree): void {
  //   const id = bonEntree.identifiantBE;
  //   const encrypt = this.securiteService.encryptUsingAES256(id);
  //   this.router.navigate(['/reception-vehicule-detail', encrypt]);
  // }

  goToDetail(bonPour: BonPour): void {
    // console.log(bonPour);

     const id = bonPour.identifiantBonPour;
     const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/dotation-vehicule-detail', encrypt]);
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




}
