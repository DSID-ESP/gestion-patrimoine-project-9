import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { Maintenance } from 'src/app/model/maintenance';
import { Vehicule } from 'src/app/model/vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { MaintenanceAjouterComponent } from '../maintenance-ajouter/maintenance-ajouter.component';
import { MaintenanceDetailComponent } from '../maintenance-detail/maintenance-detail.component';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-maintenance-liste',
  // standalone: true,
  // imports: [],
  templateUrl: './maintenance-liste.component.html',
  styleUrl: './maintenance-liste.component.css'
})
export class MaintenanceListeComponent implements OnInit, OnDestroy {



  public maintenances: Maintenance[] = [];
  public maintenance: Maintenance | undefined;

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule | undefined;

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule | undefined;


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
  maintenances$: Observable<Maintenance[]> = of();
  // recherche custom
  searchTermsFilterDoubleNumeroSerieTypeMaintenance = new Subject<string>();
  termeRechercheNumeroSerieTypeMaintenance: string = "";
  maintenanceFilterDoubleNumeroSerieTypeMaintenance$: Observable<Maintenance[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [
    "dateDebutMaintenance",
    //"dateFinMaintenance"
  ];
  columnsToHide: string[] = [
    // "nombreArme",
    // "nombreMateriel"

  ];
  dataSource = new MatTableDataSource<Maintenance>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    // "identifiantMaintenance",
    "rowNumeroSerie",
    "dateDebutMaintenance",
    "etatMaintenance",
    "typeMaintenance",
    //"observationMaintenance"
  ];
  displayedColumnsCustom: string[] = [
    // "identifiantMaintenance",
    "N° série",
    "Date prise en charge",
    "Etat maintenance",
    "Type maintenance",
   // "Observation"
  ];
  /* ----------------------------------------------------------------------------------------- */



  constructor(
    private router: Router,
    private maintenanceService: MaintenanceService,
    private vehiculeService: VehiculeService,
    private dotationVehiculeService: DotationVehiculeService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.listeMaintenances();

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.maintenances$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.maintenanceService.searchMaintenanceList(term, this.maintenances))
      // {.....List(ab)............List(abc)......}
    );
    this.maintenanceFilterDoubleNumeroSerieTypeMaintenance$ = this.searchTermsFilterDoubleNumeroSerieTypeMaintenance.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.maintenanceService.searchMaintenanceListFilterDouble(term, this.maintenances))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  // generatePDF(): void {

  //   const data: Maintenance[] = this.dataSource.filteredData;
  //   // console.log(data);


  //   const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

  //   const doc = new jsPDF();

  //   // Créez un tableau de données pour autoTable
  //   const tableData = data.map((item: Maintenance) => [
  //     // item.identifiantMaintenance,
  //     item.numeroSerie.numeroSerie,
  //     `${item.dateDebutMaintenance ? new Date(item.dateDebutMaintenance.toString()).getDate() + ' ' + months[new Date(item.dateDebutMaintenance.toString()).getMonth()] + ' ' + new Date(item.dateDebutMaintenance.toString()).getFullYear() % 100 : ''}`,
  //     `${item.dateFinMaintenance ? new Date(item.dateFinMaintenance.toString()).getDate() + ' ' + months[new Date(item.dateFinMaintenance.toString()).getMonth()] + ' ' + new Date(item.dateFinMaintenance.toString()).getFullYear() % 100 : ''}`,
  //     // `${new Date(item.dateDebutMaintenance.toString()).getDate()} ${months[new Date(item.dateDebutMaintenance.toString()).getMonth()]} ${new Date(item.dateDebutMaintenance.toString()).getFullYear() % 100}`,
  //     // `${new Date(item.dateFinMaintenance.toString()).getDate()} ${months[new Date(item.dateFinMaintenance.toString()).getMonth()]} ${new Date(item.dateFinMaintenance.toString()).getFullYear() % 100}`,
  //     item.typeMaintenance,

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
  //         { content: 'N° série', styles: { fontSize: 6 } },
  //         { content: 'Date début', styles: { fontSize: 6 } },
  //         { content: 'Date fin', styles: { fontSize: 6 } },
  //         { content: 'Type maintenance', styles: { fontSize: 6 } },
  //         // { content: 'Articles', styles: { fontSize: 6 } }
  //       ]
  //     ],
  //     body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
  //     margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
  //     theme: 'plain'
  //   });

  //   doc.save('maintenance-liste.pdf');
  // }


  search(term: string): void {
    this.termeRechercheNumeroSerieTypeMaintenance = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroSerieTypeMaintenance.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleNumeroSerieTypeMaintenance(termeRechercheNumeroSerieTypeMaintenance: string) {
    this.termeRechercheNumeroSerieTypeMaintenance = termeRechercheNumeroSerieTypeMaintenance;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroSerieTypeMaintenance;
    this.dataSource.filter = termeRechercheNumeroSerieTypeMaintenance.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroBELibelleBonEntree: string): boolean {
    return !isNaN(Number(termeRechercheNumeroBELibelleBonEntree))
  }

  filtrerParValeur(event: any) {
    const value: string = event.target.value;
    this.dataSource.filter = '';

    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }

  }


  public listeMaintenances(): void {

    const subscription = this.maintenanceService.listeMaintenances().subscribe({
      next: (response: Maintenance[]) => {
        this.maintenances = response;

        this.dataSource = new MatTableDataSource<Maintenance>(this.maintenances.map((item) => ({
          ...item,
          rowNumeroSerie: item.numeroSerie.numeroSerie
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


  popupAjouterMaintenance(): void {
    const dialogRef = this.matDialog.open(
      MaintenanceAjouterComponent,
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


  goToDetail(maintenance: Maintenance): void {
    const dialogRef = this.matDialog.open(
      MaintenanceDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: maintenance
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


}
