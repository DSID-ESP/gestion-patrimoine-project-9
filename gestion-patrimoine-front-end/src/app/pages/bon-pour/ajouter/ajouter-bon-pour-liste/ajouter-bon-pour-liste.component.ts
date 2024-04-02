import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonPour } from 'src/app/model/bon-pour.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SectionsService } from 'src/app/services/sections.service';
import { AgentService } from 'src/app/services/agent.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpErrorResponse } from '@angular/common/http';
import { AjouterBonPourAjouterComponent } from '../ajouter-bon-pour-ajouter/ajouter-bon-pour-ajouter.component';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ajouter-bon-pour-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './ajouter-bon-pour-liste.component.html',
  styleUrl: './ajouter-bon-pour-liste.component.css'
})
export class AjouterBonPourListeComponent implements OnInit, OnDestroy {

  public bonPours: BonPour[] = [];
  public bonPour: BonPour | undefined;

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour | undefined;

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public sections: Sections[] = [];
  public section: Sections | undefined;

  public agents: Agent[] = [];
  public agent: Agent | undefined;


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
  searchTermsFilterDoubleNumeroCourrielOrigineObjectCourrielOrigine = new Subject<string>();
  termeRechercheNumeroCourrielOrigineObjectCourrielOrigine: string = "";
  bonPourFilterDoubleNumeroCourrielOrigineObjectCourrielOrigine$: Observable<BonPour[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [
    "dateCourrielOrigine",
    "dateArriveDLF",
    "dateArriveBLM",
    "dateArriveSection"
  ];
  columnsToHide: string[] = [
    "descriptionBonPour",
   // "numeroCourrielOrigine",
    "numeroArriveDLF",
    //"dateArriveDLF",
    "numeroArriveBLM",
    "numeroArriveSection",
    "dateArriveSection",
    "codeSection",
    "matriculeAgent",
    "dateArriveBLM",
    "dateCourrielOrigine",
    "objectCourrielOrigine",
    "rowNombreArticleBonPour"
  ];
  dataSource = new MatTableDataSource<BonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "descriptionBonPour",
    "numeroCourrielOrigine",
    "dateCourrielOrigine",
    "etatBonPour",
    "objectCourrielOrigine",
    "numeroArriveDLF",
    "dateArriveDLF",
    "numeroArriveBLM",
    "dateArriveBLM",
    "numeroArriveSection",
    "dateArriveSection",
    "rowNomUnite",
    "codeSection",
    "matriculeAgent",
    "rowNombreArticleBonPour"
  ];
  displayedColumnsCustom: string[] = [
    "Description bon pour",
    "N° courrier origine",
    "Date courrier origine",
    "Etat bon pour",
    "Object courrier origine",
    "N° arrivée DLF",
    "Date arrivée DLF",
    "N° arrivée BLM",
    "Date arrivée BLM",
    "N° arrivée section",
    "Date arrivée section",
    "Unité",
    "Code section",
    "Agent",
    "Article"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private uniteDouaniereService: UniteDouaniereService,
    private sectionsService: SectionsService,
    private agentService: AgentService,
    private securiteService: SecuriteService,
    private matDialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.filteredUniteDouanieres = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.listeUniteDouanieres();

    this.listeArticleBonPours();

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
    this.bonPourFilterDoubleNumeroCourrielOrigineObjectCourrielOrigine$ = this.searchTermsFilterDoubleNumeroCourrielOrigineObjectCourrielOrigine.pipe(
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


  generatePDF(): void {

    const data: BonPour[] = this.dataSource.filteredData;
    // console.log(data);


    const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: BonPour) => [
      item.numeroCourrielOrigine,
      item.etatBonPour,
      `${new Date(item.dateCourrielOrigine.toString()).getDate()} ${months[new Date(item.dateCourrielOrigine.toString()).getMonth()]} ${new Date(item.dateCourrielOrigine.toString()).getFullYear() % 100}`,
      item.objectCourrielOrigine
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
          { content: 'N° courriel origine', styles: { fontSize: 6 } },
          { content: 'Date courriel origine', styles: { fontSize: 6 } },
          { content: 'Etat bon pour', styles: { fontSize: 6 } },
          { content: 'Object courriel origine', styles: { fontSize: 6 } }
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('bon-pour-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheNumeroCourrielOrigineObjectCourrielOrigine = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroCourrielOrigineObjectCourrielOrigine.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleNumeroCourrielOrigineObjectCourrielOrigine(termeRechercheNumeroCourrielOrigineObjectCourrielOrigine: string) {
    this.termeRechercheNumeroCourrielOrigineObjectCourrielOrigine = termeRechercheNumeroCourrielOrigineObjectCourrielOrigine;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroCourrielOrigineObjectCourrielOrigine;
    this.dataSource.filter = termeRechercheNumeroCourrielOrigineObjectCourrielOrigine.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroCourrielOrigineObjectCourrielOrigine: string): boolean {
    return !isNaN(Number(termeRechercheNumeroCourrielOrigineObjectCourrielOrigine))
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
  public listeArticleBonPours(): void {

    const subscription = this.articleBonPourService.listeArticleBonPours().subscribe({
      next: (response: ArticleBonPour[]) => {
        this.articleBonPours = response;
        // this.listeVehicules();
        this.listeBonPours();
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
  public listeBonPours(): void {

    const subscription = this.bonPourService.listeBonPours().subscribe({
      next: (response: BonPour[]) => {
        this.bonPours = response;

        this.dataSource = new MatTableDataSource<BonPour>(this.bonPours.map((item) => ({
          ...item,
          // raisonSociale: item.identifiantBL.ninea ? item.identifiantBL.ninea.raisonSociale : '---',
          // rowNombreArticleBonPour: this.nombreArticleBonEntree(item, this.articleBonPours),
           rowNomUnite: item.codeUniteDouaniere.nomUniteDouaniere,
        })).sort((a, b) => a.numeroCourrielOrigine - b.numeroCourrielOrigine));

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


  popupAjouterBonPourArticleBonPour(): void {
    const dialogRef = this.matDialog.open(
      AjouterBonPourAjouterComponent,
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


  goToDetail(bonPour: BonPour): void {
    const id = bonPour.identifiantBonPour;
    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/ajouter-bon-pour-detail', encrypt]);
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


  nombreArticleBonEntree(bonPour: BonPour, articleBonEntrees: ArticleBonPour[]): number {
    let nombreArticleBonPour  = 0;

    for (const articleBonPour of this.articleBonPours) {
      // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
      if (bonPour && articleBonPour.identifiantBonPour && JSON.stringify(bonPour) === JSON.stringify(articleBonPour.identifiantBonPour)) {
        nombreArticleBonPour++;
      }
    }

    return nombreArticleBonPour;
  }

}
