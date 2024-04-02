import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SecuriteService } from 'src/app/services/securite.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UniteDouaniereAjouterComponent } from '../unite-douaniere-ajouter/unite-douaniere-ajouter.component';
import { UniteDouaniereDetailComponent } from '../unite-douaniere-detail/unite-douaniere-detail.component';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-unite-douaniere-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './unite-douaniere-liste.component.html',
  styleUrl: './unite-douaniere-liste.component.css'
})
export class UniteDouaniereListeComponent implements OnInit, OnDestroy {



  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere | undefined;





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
  uniteDouanieres$: Observable<UniteDouaniere[]> = of();
  // recherche custom
  searchTermsFilterDoubleCodeUniteDouaniereNomUniteDouaniere = new Subject<string>();
  termeRechercheCodeUniteDouaniereNomUniteDouaniere: string = "";
  uniteDouaniereFilterDoubleCodeUniteDouaniereNomUniteDouaniere$: Observable<UniteDouaniere[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [

  ];
  columnsToHide: string[] = [
    // "nombreArme",
    // "nombreMateriel"

  ];
  dataSource = new MatTableDataSource<UniteDouaniere>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "codeUniteDouaniere",
    "nomUniteDouaniere",
    "effectifUniteDouaniere",
    "rowCodeTypeUniteDouaniere"
  ];
  displayedColumnsCustom: string[] = [
    "Code unité",
    "Nom unité",
    "Effectif unité",
    "Type unité"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    private uniteDouaniereService: UniteDouaniereService,
    private securiteService: SecuriteService,
    private typeUniteDouaniereService: TypeUniteDouaniereService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // this.listeVehicules();
    this.listeUniteDouanieres();
    // this.listeBonEntrees();

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.uniteDouanieres$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.uniteDouaniereService.searchUniteDouaniereList(term, this.uniteDouanieres))
      // {.....List(ab)............List(abc)......}
    );
    this.uniteDouaniereFilterDoubleCodeUniteDouaniereNomUniteDouaniere$ = this.searchTermsFilterDoubleCodeUniteDouaniereNomUniteDouaniere.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.uniteDouaniereService.searchUniteDouaniereListFilterDouble(term, this.uniteDouanieres))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: UniteDouaniere[] = this.dataSource.filteredData;
    // console.log(data);


    // const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: UniteDouaniere) => [
      item.codeUniteDouaniere,
      item.nomUniteDouaniere,
      // `${new Date(item.dateBonEntree.toString()).getDate()} ${months[new Date(item.dateBonEntree.toString()).getMonth()]} ${new Date(item.dateBonEntree.toString()).getFullYear() % 100}`,
      item.effectifUniteDouaniere,
      // item.rowCodeTypeUniteDouaniere
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
          { content: 'Code', styles: { fontSize: 6 } },
          { content: 'Nom Unité', styles: { fontSize: 6 } },
          { content: 'Effectif', styles: { fontSize: 6 } },
          // { content: 'Type Unité', styles: { fontSize: 6 } },
          // { content: 'Articles', styles: { fontSize: 6 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('unite-douaniere-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheCodeUniteDouaniereNomUniteDouaniere = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleCodeUniteDouaniereNomUniteDouaniere.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleCodeUniteDouaniereNomUniteDouaniere(termeRechercheCodeUniteDouaniereNomUniteDouaniere: string) {
    this.termeRechercheCodeUniteDouaniereNomUniteDouaniere = termeRechercheCodeUniteDouaniereNomUniteDouaniere;
    this.myInputSearch.nativeElement.value = termeRechercheCodeUniteDouaniereNomUniteDouaniere;
    this.dataSource.filter = termeRechercheCodeUniteDouaniereNomUniteDouaniere.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroBELibelleBonEntree: string): boolean {
    return !isNaN(Number(termeRechercheNumeroBELibelleBonEntree))
  }


  public listeUniteDouanieres(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;

        this.dataSource = new MatTableDataSource<UniteDouaniere>(this.uniteDouanieres.map((item) => ({
          ...item,
          rowCodeTypeUniteDouaniere: item.codeTypeUniteDouaniere.libelleTypeUniteDouaniere

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


  popupAjouterUniteDouaniere(): void {
    const dialogRef = this.matDialog.open(
      UniteDouaniereAjouterComponent,
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


  goToDetail(uniteDouaniere: UniteDouaniere): void {
    const dialogRef = this.matDialog.open(
      UniteDouaniereDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: uniteDouaniere
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
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
