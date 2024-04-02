import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, of, tap, throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReceptionVehiculeAjouterBonEntreeComponent } from '../../reception/reception-vehicule-ajouter-bon-entree/reception-vehicule-ajouter-bon-entree.component';
import { ConsultationVehiculeDetailComponent } from '../consultation-vehicule-detail/consultation-vehicule-detail.component';
import { LieuStockageVehicule } from 'src/app/model/lieu-stockage-vehicule.model';
import { LieuStockageVehiculeService } from 'src/app/services/lieu-stockage-vehicule.service';
import { MyDate } from 'src/app/model/my-date.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';


import { startWith, map, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { BonSortie } from 'src/app/model/bon-sortie.model';

@Component({
  selector: 'app-consultation-vehicule-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './consultation-vehicule-liste.component.html',
  styleUrl: './consultation-vehicule-liste.component.css'
})
export class ConsultationVehiculeListeComponent implements OnInit, OnDestroy {


  public control = new FormControl('');
  public filteredUniteDouanieres: Observable<UniteDouaniere[]> | undefined;

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  // public bonSorties: BonSortie[] = [];
  // public bonSortie: BonSortie = new BonSortie();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public lieuStockageVehicules: LieuStockageVehicule[] = [];
  public lieuStockageVehicule: LieuStockageVehicule | undefined;

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule | undefined;

  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie | undefined;



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
  vehicules$: Observable<Vehicule[]> = of();
  // recherche custom
  searchTermsFilterDoubleNumeroSerieModele = new Subject<string>();
  termeRechercheNumeroSerieModele: string = "";
  vehiculeFilterDoubleNumeroSerieModele$: Observable<Vehicule[]> = of();
  /* ----------------------------------------------------------------------------------------- */


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
    // "dateMiseEnCirculation"
  ];
  columnsToHide: string[] = [
    // "numeroSerie",
    // "numeroImmatriculation",
    // "rowPays",
    // "numeroCarteGrise",
    // "dateMiseEnCirculation",
    // "rowTypeVehicule",
    // "rowNomUniteDouaniere"
  ];
  dataSource = new MatTableDataSource<Vehicule>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowNumber",
    "rowLibelleArticleBonEntree",
    "rowLieuStockageVehicule",
    // "numeroSerie",
    // "rowEtat",
    "rowTypeEnergie",
    // "rowNomUniteDouaniere",
    "rowNombreAgeVehicule"
  ];
  displayedColumnsCustom: string[] = [
    "N°",
    "Libelle article",
    "Lieu stockage vehicule",
    // "Etat vehicule",
    "Type energie",
    // "Nom unité",
    "Age (années)"


  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private vehiculeService: VehiculeService,
    private lieuStockageVehiculeService: LieuStockageVehiculeService,
    private uniteDouaniereService: UniteDouaniereService,
    private matDialog: MatDialog,
    private dotationVehiculeService: DotationVehiculeService,
    private bonSortieService: BonSortieService,

  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.filteredUniteDouanieres = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.listeDotationVehicule();
    // this.listeVehicules();
    this.listeLieuStockageVehicules();
    this.listeUniteDouanieres();
    this.listeBonSorties();


    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.vehicules$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeList(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    this.vehiculeFilterDoubleNumeroSerieModele$ = this.searchTermsFilterDoubleNumeroSerieModele.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.vehiculeService.searchVehiculeListFilterDouble(term, this.vehicules))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: Vehicule[] = this.dataSource.filteredData;
    // const data: any[] = this.dataSource.filteredData;

    // console.log(data);


    // const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];
    const months = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: Vehicule) => [
      // const tableData = data.map((item: any) => [

      item.numeroSerie,
      item.numeroImmatriculation,
      item.modele || 'N/A',
      // item.rowEtat,
      // item.rowTypeEnergie,
      // item.rowPays,
      item.numeroCarteGrise,
      item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear()}` : 'N/A',
      // item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear() % 100}` : 'N/A',
      // `${new Date(item.dateMiseEnCirculation).getDate()} ${months[new Date(item.dateMiseEnCirculation).getMonth()]} ${new Date(item.dateMiseEnCirculation).getFullYear() % 100}`,
      // item.rowTypeVehicule,
      // item.rowMarque
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
          { content: 'N° serie', styles: { fontSize: 6 } },
          { content: 'N° immatriculation', styles: { fontSize: 6 } },
          { content: 'Modele', styles: { fontSize: 6 } },
          // { content: 'Etat vehicule', styles: { fontSize: 6 } },
          // { content: 'Type energie', styles: { fontSize: 6 } },
          // { content: 'Provenance', styles: { fontSize: 6 } },
          { content: 'N° carte grise', styles: { fontSize: 6 } },
          { content: 'Date mise en circulation', styles: { fontSize: 6 } },
          // { content: 'Type vehicule', styles: { fontSize: 6 } },
          // { content: 'Marque', styles: { fontSize: 6 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('vehicule-liste.pdf');
  }


  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
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
  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  search(term: string): void {
    this.termeRechercheNumeroSerieModele = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroSerieModele.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  FilterDoubleNumeroSerieModele(termeRechercheNumeroSerieModele: string) {
    this.termeRechercheNumeroSerieModele = termeRechercheNumeroSerieModele;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroSerieModele;
    this.dataSource.filter = termeRechercheNumeroSerieModele.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroSerieModele: string): boolean {
    return !isNaN(Number(termeRechercheNumeroSerieModele))
  }


  filtrerParAgeVehicule(event: any) {
    const selectedAge: string = event.target.value;
    if (selectedAge) {
      // Appliquer le filtre seulement si une valeur d'âge est sélectionnée
      this.dataSource.filter = selectedAge.trim().toLowerCase();
    } else {
      // Réinitialiser le filtre si aucune valeur d'âge n'est sélectionnée
      this.dataSource.filter = '';
    }
  }

  filtrerParUniteDouaniere(event: any) {
    const value: string = event.target.value;
    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }



  filtrerParLieuStockageVehicule(event: any) {
    const value: string = event.target.value;
    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }



  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {

        // console.log(response);

        // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
        this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
        // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<Vehicule>(this.vehicules.map((item) => ({
          ...item,

          // vehicule: [] as Vehicule[],
          rowMarque: item.codeMarque.libelleMarqueVH,
          rowPays: item.codePays.libellePays,
          // rowEtat: item.codeEtat.libelleEtat,
          rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
          rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule,
          rowLibelleArticleBonEntree: item.codeArticleBonEntree.libelleArticleBonEntree,
          rowLieuStockageVehicule: item.codeArticleBonEntree.codeLieuVH.libellleLieuVH,
          rowNombreAgeVehicule: this.calculerAgeVehicule(new Date(item.dateMiseEnCirculation.toString())),
          rowNomUniteDouaniere: this.identifiantBonSortieByDotationVehicules(item, this.dotationVehicules),
          rowNumber: this.rowNumber++,
        })));


        console.log(this.dataSource);

        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  identifiantBonSortieByDotationVehicules(vehicule: Vehicule, dotationVehicules: DotationVehicule[]): string {

    let identifiantBonSortie = "";

    for (let dotationVehicule of dotationVehicules) {

      if (vehicule.numeroSerie === dotationVehicule.numeroSerie.numeroSerie) {
        identifiantBonSortie = dotationVehicule.codeArticleBonSortie.identifiantBonSortie;
        return this.identifiantBonPourByIdentifiantBonSortie(identifiantBonSortie);
      }
    }

    return "";
  }

  identifiantBonPourByIdentifiantBonSortie(identifiantBonSortie: string): string {

    let bonSortie: BonSortie | undefined;

    // console.log(this.bonSorties);

    bonSortie = this.bonSorties.find(bonSortie => bonSortie.identifiantBonSortie === identifiantBonSortie);

    return bonSortie? bonSortie.identifiantBonPour.codeUniteDouaniere.nomUniteDouaniere : "";
  }

  public listeLieuStockageVehicules(): void {

    const subscription = this.lieuStockageVehiculeService.listeLieuStockageVehicules().subscribe({
      next: (response: LieuStockageVehicule[]) => {
        this.lieuStockageVehicules = response;
        // console.log(this.secteurActivites);

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
        this.bonSorties = response;
        // console.log(this.bonSorties);
        this.listeVehicules();
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
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

  public listeDotationVehicule(): void {

    const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
      next: (response: DotationVehicule[]) => {
        this.dotationVehicules = response;
        this.listeBonSorties();

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
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


  compare(value1: String, value2: String): boolean {
    return value1 === value1;
  }


  calculerAgeVehicule(dateMiseEnCirculation: Date): string {
    if (!dateMiseEnCirculation) {
      return '0 ans'; // Gérer le cas où la conversion échoue
    }

    const diffEnMs = Math.abs(dateMiseEnCirculation.getTime() - new Date().getTime());
    const annees = Math.floor(diffEnMs / (1000 * 60 * 60 * 24 * 365)); // Nombre d'années écoulées
    const moisRestants = Math.floor((diffEnMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44)); // Mois restants après le calcul des années
    return `${annees} ans`;
  }


  //   libelleUniteDouaniere(vehicule: Vehicule, dotationVehiculeVehicules: DotationVehiculeVehicule[]): string {
  //     const dotation = dotationVehiculeVehicules.find(dotation => dotation.numeroSerie.numeroSerie === vehicule.numeroSerie);
  //     console.log(dotation);

  //     return dotation ? dotation.identifiantDV.identifiantBS.identifiantBS.identifiantBP.codeUniteDouaniere.nomUniteDouaniere : '';
  // }







}
