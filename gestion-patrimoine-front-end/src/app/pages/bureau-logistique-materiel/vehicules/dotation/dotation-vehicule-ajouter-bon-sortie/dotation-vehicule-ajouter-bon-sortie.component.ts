import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicule } from 'src/app/model/vehicule.model';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BonPour } from 'src/app/model/bon-pour.model';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DotationVehiculeDetailBonSortieComponent } from '../dotation-vehicule-detail-bon-sortie/dotation-vehicule-detail-bon-sortie.component';

@Component({
  selector: 'app-dotation-vehicule-ajouter-bon-sortie',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-ajouter-bon-sortie.component.html',
  styleUrl: './dotation-vehicule-ajouter-bon-sortie.component.css'
})
export class DotationVehiculeAjouterBonSortieComponent implements OnInit, OnDestroy {


  public bonPours: BonPour[] = [];
  public bonPour : BonPour | undefined;

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

  searchTermsFilterDoubleEtatBPDescriptionBP = new Subject<string>();
  termeRechercheEtatBPDescriptionBP: string = "";
  bonPourFilterDoubleEtatBPDescriptionBP$: Observable<BonPour[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [
    "dateCourrielOrigine ",
    "dateCourrielOrigine",
    "dateArriveDLF",
    "dateArriveBLM",
    "dateArriveSection"
  ];
  columnsToHide: string[] = [
    "numeroArriveDLF",
    "dateArriveDLF",
    "numeroArriveBLM",
    "dateArriveBLM",
    "numeroArriveSection",
    "dateArriveSection"
  ];
  dataSource = new MatTableDataSource<BonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [

    "numeroCourrielOrigine",
    "descriptionBP",
    "dateCourrielOrigine",
    "etatBP",
    "objectCourrielOrigine"

  ];
  displayedColumnsCustom: string[] = [
    "N° courriel origine",
    "Description bon pour",
    "Date courriel Origine",
    "Etat bon pour",
    "Object courriel origine"

  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private bonPourService: BonPourService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    // this.listeVehicules();

    this.listeBonPours();


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
    this.bonPourFilterDoubleEtatBPDescriptionBP$ = this.searchTermsFilterDoubleEtatBPDescriptionBP.pipe(
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


  // generatePDF(): void {

  //   const data: Vehicule[] = this.dataSource.filteredData;
  //   // const data: any[] = this.dataSource.filteredData;

  //   // console.log(data);


  //   // const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];
  //   const months = ['JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'];
  //   const doc = new jsPDF();

  //   // Créez un tableau de données pour autoTable
  //   const tableData = data.map((item: Vehicule) => [
  //   // const tableData = data.map((item: any) => [

  //     item.numeroSerie,
  //     item.numeroImmatriculation,
  //     item.modele || 'N/A',
  //     item.rowEtat,
  //     item.rowTypeEnergie,
  //     item.rowPays,
  //     item.numeroCarteGrise,
  //     item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear()}` : 'N/A',
  //     // item.dateMiseEnCirculation ? `${new Date(item.dateMiseEnCirculation.toString()).getDate()} ${months[new Date(item.dateMiseEnCirculation.toString()).getMonth()]} ${new Date(item.dateMiseEnCirculation.toString()).getFullYear() % 100}` : 'N/A',
  //     // `${new Date(item.dateMiseEnCirculation).getDate()} ${months[new Date(item.dateMiseEnCirculation).getMonth()]} ${new Date(item.dateMiseEnCirculation).getFullYear() % 100}`,
  //     item.rowTypeVehicule,
  //     item.rowMarque
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
  //         { content: 'N° serie', styles: { fontSize: 6 } },
  //         { content: 'N° immatriculation', styles: { fontSize: 6 } },
  //         { content: 'Modele', styles: { fontSize: 6 } },
  //         { content: 'Etat vehicule', styles: { fontSize: 6 } },
  //         { content: 'Type energie', styles: { fontSize: 6 } },
  //         { content: 'Provenance', styles: { fontSize: 6 } },
  //         { content: 'N° carte grise', styles: { fontSize: 6 } },
  //         { content: 'Date mise en circulation', styles: { fontSize: 6 } },
  //         { content: 'Type vehicule', styles: { fontSize: 6 } },
  //         { content: 'Marque', styles: { fontSize: 6 } }
  //       ]
  //     ],
  //     body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
  //     margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
  //     theme: 'plain'
  //   });

  //   doc.save('vehicule-liste.pdf');
  // }


  search(term: string): void {
    this.termeRechercheEtatBPDescriptionBP = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleEtatBPDescriptionBP.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  FilterDoubleEtatBPDescriptionBP(termeRechercheEtatBPDescriptionBP: string) {
    this.termeRechercheEtatBPDescriptionBP = termeRechercheEtatBPDescriptionBP;
    this.myInputSearch.nativeElement.value = termeRechercheEtatBPDescriptionBP;
    this.dataSource.filter = termeRechercheEtatBPDescriptionBP.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroSerieModele: string): boolean {
    return !isNaN(Number(termeRechercheNumeroSerieModele))
  }


  public listeBonPours(): void {

    const subscription = this.bonPourService.listeBonPours().subscribe({
      next: (response: BonPour[]) => {

        // console.log(response);


        // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
        this.bonPours = response.sort((a, b) => Number(a.numeroCourrielOrigine) - Number(b.numeroCourrielOrigine));
        // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
        // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
        // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());



        // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
        this.dataSource = new MatTableDataSource<BonPour>(this.bonPours.map((item) => ({
          ...item,
          // vehicule: [] as Vehicule[],
          // rowMarque: item.codeMarque.libelleMarque,
          // rowPays: item.codePays.libellePays,
          // rowEtat: item.codeEtat.libelleEtat,
          // rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
          // rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule
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







  popupDetail(bonPour: BonPour): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeDetailBonSortieComponent,
      {
        width: '80%',
        height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: bonPour
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  // popupAjouterBonSortie(): void {
  //   const dialogRef = this.matDialog.open(
  //     DotationVehiculeAjouterBonSortieComponent,
  //     {
  //       width: '80%',
  //       height: '80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }



  compare(value1: String, value2: String): boolean {
    return value1 === value1;
  }



}
