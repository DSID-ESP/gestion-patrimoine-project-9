import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, of, startWith, switchMap } from 'rxjs';
import { Agent } from 'src/app/model/agent.model';
import { Sections } from 'src/app/model/sections.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { AgentService } from 'src/app/services/agent.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { AgentAjouterComponent } from '../agent-ajouter/agent-ajouter.component';
import { AgentDetailComponent } from '../agent-detail/agent-detail.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-agent-liste',
  // standalone: true,
  // imports: [],
  templateUrl: './agent-liste.component.html',
  styleUrl: './agent-liste.component.css'
})
export class AgentListeComponent implements OnInit, OnDestroy {

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  public sections: Sections[] = [];
  public section: Sections = new Sections();

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
  agents$: Observable<Agent[]> = of();
  // recherche custom
  searchTermsFilterDoubleNumeroTelephoneAgentEmailAgent = new Subject<string>();
  termeRechercheNumeroTelephoneAgentEmailAgent: string = "";
  agentsFilterDoubleNumeroTelephoneAgentEmailAgent$: Observable<Agent[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  columnsDateFormat: string[] = [
  ];
  columnsToHide: string[] = [
    "codeAgent",
    "emailAgent",
    "numeroTelephoneAgent",
    "codeSection"
  ];
  dataSource = new MatTableDataSource<Agent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "matriculeAgent",
    "codeAgent",
    "nomAgent",
    "prenomAgent",
    "numeroTelephoneAgent",
    "emailAgent",
    "rowNomUniteDouaniere",
    "codeSection"
  ];
  displayedColumnsCustom: string[] = [
    "N° matricule",
    "N° code",
    "Nom",
    "Prénom",
    "Téléphone",
    "Email",
    "Nom unité",
    "Nom section"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private agentService: AgentService,
    private uniteDouaniereService: UniteDouaniereService,
    private sectionsServices: SectionsService,
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
    this.listeAgents();
    this.listeUniteDouanieres();
    this.listeSections();


    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.agents$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.agentService.searchAgentsList(term, this.agents))
      // {.....List(ab)............List(abc)......}
    );
    this.agentsFilterDoubleNumeroTelephoneAgentEmailAgent$ = this.searchTermsFilterDoubleNumeroTelephoneAgentEmailAgent.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.agentService.searchAgentListFilterDouble(term, this.agents))
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


  generatePDF(): void {

    const data: Agent[] = this.dataSource.filteredData;
    // console.log(data);


    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: Agent) => [
      item.matriculeAgent,
      item.codeAgent,
      item.nomAgent,
      item.prenomAgent,
      item.numeroTelephoneAgent,
      item.emailAgent,
      item.codeUniteDouaniere.nomUniteDouaniere,
      item.codeSection.libelleSection
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
          { content: 'N° matricule', styles: { fontSize: 6 } },
          { content: 'N° code', styles: { fontSize: 6 } },
          { content: 'Nom', styles: { fontSize: 6 } },
          { content: 'Prénom', styles: { fontSize: 6 } },
          { content: 'Téléphone', styles: { fontSize: 6 } },
          { content: 'Email', styles: { fontSize: 6 } },
          { content: 'Nom unité', styles: { fontSize: 6 } },
          { content: 'Nom section', styles: { fontSize: 6 } },
        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('agent-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheNumeroTelephoneAgentEmailAgent = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleNumeroTelephoneAgentEmailAgent.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleNumeroTelephoneAgentEmailAgent(termeRechercheNumeroTelephoneAgentEmailAgent: string) {
    this.termeRechercheNumeroTelephoneAgentEmailAgent = termeRechercheNumeroTelephoneAgentEmailAgent;
    this.myInputSearch.nativeElement.value = termeRechercheNumeroTelephoneAgentEmailAgent;
    this.dataSource.filter = termeRechercheNumeroTelephoneAgentEmailAgent.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheNumeroTelephoneAgentEmailAgent: string): boolean {
    return !isNaN(Number(termeRechercheNumeroTelephoneAgentEmailAgent))
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
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.prestataires);

        // ---------------------------------------------
        this.rowNumber = 1;

        this.dataSource = new MatTableDataSource<Agent>(this.agents.map((item) => ({
          ...item,


          rowNomUniteDouaniere: item.codeUniteDouaniere.nomUniteDouaniere,

        })));



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


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeSections(): void {

    const subscription = this.sectionsServices.listeSections().subscribe({
      next: (response: Sections[]) => {
        this.sections = response;
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


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
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
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  popupAjouter(): void {
    const dialogRef = this.matDialog.open(
      AgentAjouterComponent,
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

  popupDetail(agent: Agent): void {
    const dialogRef = this.matDialog.open(
      AgentDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: agent
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }



}
