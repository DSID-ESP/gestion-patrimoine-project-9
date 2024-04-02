import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { TypeUniteDouaniereAjouterComponent } from '../type-unite-douaniere-ajouter/type-unite-douaniere-ajouter.component';
import { TypeUniteDouaniereDetailComponent } from '../type-unite-douaniere-detail/type-unite-douaniere-detail.component';

@Component({
  selector: 'app-type-unite-douaniere-liste',
  // standalone: true,
  // imports: [],
  templateUrl: './type-unite-douaniere-liste.component.html',
  styleUrl: './type-unite-douaniere-liste.component.css'
})
export class TypeUniteDouaniereListeComponent implements OnInit, OnDestroy {


  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere = new TypeUniteDouaniere();



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
 fonctions$: Observable<TypeUniteDouaniere[]> = of();
 // recherche custom
 searchTermsFilterDoubleCodeTypeUniteDouaniere = new Subject<string>();
 termeRechercheCodeTypeUniteDouaniere: string = "";
 typeFilterDoubleCodeTypeUniteDouaniere$: Observable<TypeUniteDouaniere[]> = of();
 /* ----------------------------------------------------------------------------------------- */


 /* ----------------------------------------------------------------------------------------- */
 // tableau
 columnsDateFormat: string[] = [

 ];
 columnsToHide: string[] = [
   // "nombreArme",
   // "nombreMateriel"

 ];
 dataSource = new MatTableDataSource<TypeUniteDouaniere>();
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 displayedColumns: string[] = [
   "codeTypeUniteDouaniere",
   "libelleTypeUniteDouaniere"

 ];
 displayedColumnsCustom: string[] = [
   "Code",
   "libellé type"

 ];
 /* ----------------------------------------------------------------------------------------- */

 constructor(
   private typeUniteDouaniereService: TypeUniteDouaniereService,
   private matDialog: MatDialog,
 ) { }

 ngOnDestroy(): void {
   this.subscriptions.forEach(sub => sub.unsubscribe());
 }

 ngOnInit(): void {
   // this.listeVehicules();
   this.listeTypeUniteDouanieres();
   // this.listeBonEntrees();

   /* ----------------------------------------------------------------------------------------- */
   // rechercher
   this.fonctions$ = this.searchTerms.pipe(
     // {...."ab"..."abz"."ab"...."abc"......}
     debounceTime(300),
     // {......"ab"...."ab"...."abc"......}
     distinctUntilChanged(),
     // {......"ab"..........."abc"......}
     switchMap((term) => this.typeUniteDouaniereService.searchTypeUniteDouaniereList(term, this.typeUniteDouanieres))
     // {.....List(ab)............List(abc)......}
   );
   this.typeFilterDoubleCodeTypeUniteDouaniere$ = this.searchTermsFilterDoubleCodeTypeUniteDouaniere.pipe(
     // {...."ab"..."abz"."ab"...."abc"......}
     debounceTime(300),
     // {......"ab"...."ab"...."abc"......}
     distinctUntilChanged(),
     // {......"ab"..........."abc"......}
     switchMap((term) => this.typeUniteDouaniereService.searchTypeUniteDouaniereListFilterDouble(term, this.typeUniteDouanieres))
     // {.....List(ab)............List(abc)......}
   );
   /* ----------------------------------------------------------------------------------------- */
 }


 generatePDF(): void {

   const data: TypeUniteDouaniere[] = this.dataSource.filteredData;
   // console.log(data);


  //  const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

   const doc = new jsPDF();

   // Créez un tableau de données pour autoTable
   const tableData = data.map((item: TypeUniteDouaniere) => [
     item.codeTypeUniteDouaniere,
     item.libelleTypeUniteDouaniere,
    //  `${new Date(item.dateBonEntree.toString()).getDate()} ${months[new Date(item.dateBonEntree.toString()).getMonth()]} ${new Date(item.dateBonEntree.toString()).getFullYear() % 100}`,
    //  item.observationBonEntree,
    //  item.rowNombreArticleBonEntree
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
         { content: 'Libellé type', styles: { fontSize: 6 } },
        //  { content: 'Date bon d\'entrée', styles: { fontSize: 6 } },
        //  { content: 'Observation bon d\'entrée', styles: { fontSize: 6 } },
        //  { content: 'Articles', styles: { fontSize: 6 } }
       ]
     ],
     body: tableData.map(row => row.map(cell => ({ content: cell.toString(), styles: { fontSize: 6 } }))),
     margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft },
     theme: 'plain'
   });

   doc.save('type-unite-douaniere-liste.pdf');
 }


 search(term: string): void {
   this.termeRechercheCodeTypeUniteDouaniere = term;
   this.searchTerms.next(term);
   this.searchTermsFilterDoubleCodeTypeUniteDouaniere.next(term);
 }

 applyFilter(event: Event): void {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
 }


 FilterDoubleCodeTypeUniteDouaniere(termeRechercheCodeTypeUniteDouaniere: string) {
   this.termeRechercheCodeTypeUniteDouaniere = termeRechercheCodeTypeUniteDouaniere;
   this.myInputSearch.nativeElement.value = termeRechercheCodeTypeUniteDouaniere;
   this.dataSource.filter = termeRechercheCodeTypeUniteDouaniere.trim().toLowerCase(); // supprimer les espaces vide et mettre minuscule
   this.focusOnInput = false;
 }


 isNumber(termeRechercheCodeTypeUniteDouaniere: string): boolean {
   return !isNaN(Number(termeRechercheCodeTypeUniteDouaniere))
 }




 public listeTypeUniteDouanieres(): void {

   const subscription = this.typeUniteDouaniereService.listeTypeUniteDouanieres().subscribe({
     next: (response: TypeUniteDouaniere[]) => {
       this.typeUniteDouanieres = response;

       this.dataSource = new MatTableDataSource<TypeUniteDouaniere>(this.typeUniteDouanieres.map((item) => ({
         ...item
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


 popupAjouterTypeUniteDouaniere(): void {
   const dialogRef = this.matDialog.open(
    TypeUniteDouaniereAjouterComponent,
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


 goToDetail(typeUniteDouaniere: TypeUniteDouaniere): void {
   const dialogRef = this.matDialog.open(
    TypeUniteDouaniereDetailComponent,
     {
       width: '80%',
       enterAnimationDuration: '100ms',
       exitAnimationDuration: '100ms',
       data: typeUniteDouaniere
     }
   );

   dialogRef.afterClosed().subscribe(() => {
     this.ngOnInit();
   });
 }


}
