import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Prestataires } from 'src/app/model/prestataires.model';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { PrestataireSecteurAjouterComponent } from '../prestataire-secteur-ajouter/prestataire-secteur-ajouter.component';
import { PrestataireSecteurDetailComponent } from '../prestataire-secteur-detail/prestataire-secteur-detail.component';


@Component({
  selector: 'app-prestataire-secteur-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './prestataire-secteur-liste.component.html',
  styleUrl: './prestataire-secteur-liste.component.css'
})
export class PrestataireSecteurListeComponent implements OnInit, OnDestroy {

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires | undefined;

  public secteurActivites: SecteurActivite[] = [];
  public secteurActivite: SecteurActivite | undefined;


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
  prestataires$: Observable<Prestataires[]> = of();
  // recherche custom
  searchTermsFilterDoubleNumeroTelephoneAdresseEmail = new Subject<string>();
  termeRechercheNumeroTelephoneAdresseEmail: string = "";
  prestatairesFilterDoubleNumeroTelephoneAdresseEmail$: Observable<Prestataires[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = [
  ];
  columnsToHide: string[] = [
  ];
  dataSource = new MatTableDataSource<Prestataires>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "ninea",
    "adresseEmail",
    "numeroTelephone",
    "adresse",
    "raisonSociale",
  ];
  displayedColumnsCustom: string[] = [
    "NINEA",
    "Email",
    "N° téléphone",
    "Adresse",
    "Raison sociale",
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private prestatairesService: PrestatairesService,
    private secteurActiviteService: SecteurActiviteService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listePrestataires();
    this.listeSecteurActivites();


    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.prestataires$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.prestatairesService.searchPrestatairesList(term, this.prestataires))
      // {.....List(ab)............List(abc)......}
    );
    this.prestatairesFilterDoubleNumeroTelephoneAdresseEmail$ = this.searchTermsFilterDoubleNumeroTelephoneAdresseEmail.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.prestatairesService.searchPrestatairesListFilterDouble(term, this.prestataires))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: Prestataires[] = this.dataSource.filteredData;
    // console.log(data);


    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: Prestataires) => [
      item.ninea,
      item.adresseEmail,
      item.numeroTelephone,
      item.adresse,
      item.raisonSociale,
      // item.secteurActivite ? item.secteurActivite : []
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
          { content: 'NINEA', styles: { fontSize: 6 } },
          { content: 'Adresse email', styles: { fontSize: 6 } },
          { content: 'N° téléphone', styles: { fontSize: 6 } },
          { content: 'Adresse', styles: { fontSize: 6 } },
          { content: 'Raison sociale', styles: { fontSize: 6 } },
          // { content: 'Secteurs activité', styles: { fontSize: 6 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('prestataires-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheNumeroTelephoneAdresseEmail = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroTelephoneAdresseEmail.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleNumeroTelephoneAdresseEmail(termeRechercheNumeroTelephoneAdresseEmail: string) {
    this.termeRechercheNumeroTelephoneAdresseEmail = termeRechercheNumeroTelephoneAdresseEmail;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroTelephoneAdresseEmail;
    this.dataSource.filter = termeRechercheNumeroTelephoneAdresseEmail.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroTelephoneAdresseEmail: string): boolean {
    return !isNaN(Number(termeRechercheNumeroTelephoneAdresseEmail))
  }

  filtrerParSecteur(event: any) {
    const value: string = event.target.value;
    if (value) {
      this.dataSource.filter = value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listePrestataires(): void {

    const subscription = this.prestatairesService.listePrestataires().subscribe({
      next: (response: Prestataires[]) => {
        this.prestataires = response;
        // console.log(this.prestataires);

        // ---------------------------------------------
        this.rowNumber = 1;

        // this.dataSource = new MatTableDataSource<Prestataires>(this.prestataires);
        this.dataSource = new MatTableDataSource<Prestataires>(this.prestataires.map((item) => {
          // Copie les propriétés de l'objet Prestataires
          const newItem: any = { ...item };

          // Vérifie si secteurActivite existe et n'est pas vide
          if (item.secteurActivite && item.secteurActivite.length > 0) {
            // Initialise une variable pour stocker les libellés des secteurs d'activité
            let secteurActiviteLabels = '';

            // Parcours chaque élément du tableau secteurActivite et concatène les libellés
            for (const secteur of item.secteurActivite) {
              secteurActiviteLabels += secteur.libelleSecteurActivite + ', ';
            }

            // Supprime la virgule et l'espace en trop à la fin
            newItem.rowSecteurActivite = secteurActiviteLabels.slice(0, -2);
          } else {
            newItem.rowSecteurActivite = ''; // Gérer le cas où il n'y a pas de secteur d'activité
          }

          // Autres propriétés que vous pouvez copier ou modifier si nécessaire
          // newItem.rowPays = item.codePays.libellePays;

          return newItem;
        }));

        // console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        // ---------------------------------------------

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
  public listeSecteurActivites(): void {

    const subscription = this.secteurActiviteService.listeSecteurActivites().subscribe({
      next: (response: SecteurActivite[]) => {
        this.secteurActivites = response;
        // console.log(this.secteurActivites);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  popupAjouter(): void {
    const dialogRef = this.matDialog.open(
      PrestataireSecteurAjouterComponent,
      {
        width: '80%',
        height: 'auto',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  popupDetail(prestataire: Prestataires): void {
    const dialogRef = this.matDialog.open(
      PrestataireSecteurDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: prestataire
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }



}
