import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SecuriteService } from 'src/app/services/securite.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorityService } from 'src/app/services/authority.service';
import { Authorities } from 'src/app/model/authorities.model';
import { UtilisateurDetailComponent } from '../utilisateur-detail/utilisateur-detail.component';
import { UtilisateurAjouterComponent } from '../utilisateur-ajouter/utilisateur-ajouter.component';

@Component({
  selector: 'app-utilisateur-liste',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './utilisateur-liste.component.html',
  styleUrl: './utilisateur-liste.component.css'
})
export class UtilisateurListeComponent implements OnInit, OnDestroy {

  public utilisateur: Utilisateur = new Utilisateur();
  public utilisateurs: Utilisateur[] = [];

  public authority: Authorities = new Authorities();
  public authorities: Authorities[] = [];

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
  users$: Observable<Utilisateur[]> = of();
  // recherche custom
  searchTermsFilterDoubleEmailMobile = new Subject<string>();
  termeRechercheEmailMobile: string = "";
  userFilterDoubleEmailMobile$: Observable<Utilisateur[]> = of();
  /* ----------------------------------------------------------------------------------------- */


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  columnsDateFormat: string[] = [
    "joinDate",
    "lastLoginDate",
    "lastLoginDateDisplay"
  ];
  columnsToHide: string[] = [
    "rowNumeroTelephoneAgent",
    "rowNomUniteDouaniere",
    "joinDate",
    "lastLoginDate",
    "lastLoginDateDisplay",
    "active",
    "notLocked",
    "rowcodeAgent",
    "rowEmailAgent",
  ];
  dataSource = new MatTableDataSource<Utilisateur>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowMatriculeAgent",
    "rowcodeAgent",
    "rowPrenomAgent",
    "rowNomAgent",
    "rowEmailAgent",
    "rowNumeroTelephoneAgent",
    "rowLibelleSection",
    "rowNomUniteDouaniere",
    //
    "joinDate",
    "lastLoginDateDisplay",
    "active",
    "notLocked",
    //
    "rowLibelleFonction"

  ];
  displayedColumnsCustom: string[] = [
    "N° matricule",
    "N° code",
    "Prénom",
    "Nom",
    "Email",
    "Téléphone",
    "Section",
    "Nom unité",
    //
    "Join",
    "Connecté le",
    "Activé",
    "Blocké",
    //
    "Fonction"
  ];
  /* ----------------------------------------------------------------------------------------- */

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private authorityService: AuthorityService,
    private securiteService: SecuriteService,
    private matDialog: MatDialog,
  ) { }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listeUsers();

    // this.listeAuthorities();

    /* ----------------------------------------------------------------------------------------- */
    // rechercher
    this.users$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.utilisateurService.searchUsersList(term, this.utilisateurs))
      // {.....List(ab)............List(abc)......}
    );
    this.userFilterDoubleEmailMobile$ = this.searchTermsFilterDoubleEmailMobile.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      debounceTime(300),
      // {......"ab"...."ab"...."abc"......}
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      switchMap((term) => this.utilisateurService.searchUserListFilterDouble(term, this.utilisateurs))
      // {.....List(ab)............List(abc)......}
    );
    /* ----------------------------------------------------------------------------------------- */
  }


  generatePDF(): void {

    const data: Utilisateur[] = this.dataSource.filteredData;
    // console.log(data);
    

    const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

    const doc = new jsPDF();

    // Créez un tableau de données pour autoTable
    const tableData = data.map((item: Utilisateur) => [

      item.matriculeAgent.matriculeAgent,
      item.matriculeAgent.codeAgent,
      item.matriculeAgent.prenomAgent,
      item.matriculeAgent.nomAgent,
      item.matriculeAgent.emailAgent,
      item.matriculeAgent.numeroTelephoneAgent,
      item.matriculeAgent.codeSection.libelleSection,
      item.matriculeAgent.codeUniteDouaniere.nomUniteDouaniere,
      // `${new Date(item.joinDate.toString()).getDate()} ${months[new Date(item.joinDate.toString()).getMonth()]} ${new Date(item.joinDate.toString()).getFullYear() % 100}`,
      // `${new Date(item.lastLoginDateDisplay.toString()).getDate()} ${months[new Date(item.lastLoginDateDisplay.toString()).getMonth()]} ${new Date(item.lastLoginDateDisplay.toString()).getFullYear() % 100}`,
      
      `${item.joinDate ? new Date(item.joinDate.toString()).getDate() + ' ' + months[new Date(item.joinDate.toString()).getMonth()] + ' ' + new Date(item.joinDate.toString()).getFullYear() % 100 : ''}`,
      `${item.lastLoginDateDisplay ? new Date(item.lastLoginDateDisplay.toString()).getDate() + ' ' + months[new Date(item.lastLoginDateDisplay.toString()).getMonth()] + ' ' + new Date(item.lastLoginDateDisplay.toString()).getFullYear() % 100 : ''}`,


      item.active,
      item.notLocked,
      item.codeFonction.libelleFonction,
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
          { content: 'Prénom', styles: { fontSize: 6 } },
          { content: 'Nom', styles: { fontSize: 6 } },
          { content: 'Email', styles: { fontSize: 6 } },
          { content: 'Téléphone', styles: { fontSize: 6 } },
          { content: 'Section', styles: { fontSize: 6 } },
          { content: 'Nom unité', styles: { fontSize: 6 } },
          { content: 'Join le', styles: { fontSize: 6 } },
          { content: 'Connecté le', styles: { fontSize: 6 } },
          { content: 'Activé', styles: { fontSize: 6 } },
          { content: 'Blocké', styles: { fontSize: 6 } },
          { content: 'Fonction', styles: { fontSize: 6 } },

        ]
      ],
      body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
      margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
      theme: 'plain'
    });

    doc.save('utilisateur-liste.pdf');
  }


  search(term: string): void {
    this.termeRechercheEmailMobile = term;
    this.searchTerms.next(term);
    this.searchTermsFilterDoubleEmailMobile.next(term);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  FilterDoubleEmailMobile(termeRechercheEmailMobile: string) {
    this.termeRechercheEmailMobile = termeRechercheEmailMobile;
    this.myInputSearch.nativeElement.value = termeRechercheEmailMobile;
    this.dataSource.filter = termeRechercheEmailMobile.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
    this.focusOnInput = false;
  }


  isNumber(termeRechercheEmailMobile: string): boolean {
    return !isNaN(Number(termeRechercheEmailMobile))
  }



  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeUsers(): void {

    const subscription = this.utilisateurService.listeUsers().subscribe({
      next: (response: Utilisateur[]) => {
        this.utilisateurs = response;
        console.log(this.utilisateurs);
        

        this.dataSource = new MatTableDataSource<Utilisateur>(this.utilisateurs.map((item) => ({
          ...item,

          rowMatriculeAgent: item.matriculeAgent.matriculeAgent,
          rowcodeAgent: item.matriculeAgent.codeAgent,
          rowPrenomAgent: item.matriculeAgent.prenomAgent,
          rowNomAgent: item.matriculeAgent.nomAgent,
          rowEmailAgent: item.matriculeAgent.emailAgent,
          rowNumeroTelephoneAgent: item.matriculeAgent.numeroTelephoneAgent,
          rowLibelleSection: item.matriculeAgent.codeSection ? item.matriculeAgent.codeSection.libelleSection : '---',
          rowNomUniteDouaniere: item.matriculeAgent.codeUniteDouaniere ? item.matriculeAgent.codeUniteDouaniere.nomUniteDouaniere : '---',
          joinDate: item.joinDate,
          lastLoginDateDisplay: item.lastLoginDateDisplay,
          active: item.active,
          notLocked: item.notLocked,
          rowLibelleFonction: item.codeFonction.libelleFonction,


          // raisonSociale: item.identifiantBL.ninea ? item.identifiantBL.ninea.raisonSociale : '---',
          // rowNombreArticleBonPour: this.nombreArticleBonEntree(item, this.articleBonPours)
        })).sort((a, b) => a.rowNomAgent.localeCompare(b.rowNomAgent)));
    
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
  

  popupAjouterUser(): void {
    const dialogRef = this.matDialog.open(
      UtilisateurAjouterComponent,
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
  

  goToDetail(utilisateur: Utilisateur): void {
    const dialogRef = this.matDialog.open(
      UtilisateurDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: utilisateur
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }




}