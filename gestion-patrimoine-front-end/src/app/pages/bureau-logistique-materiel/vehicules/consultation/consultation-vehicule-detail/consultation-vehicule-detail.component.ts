import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Vehicule } from 'src/app/model/vehicule.model';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { MyDateService } from 'src/app/services/my-date.service';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';

@Component({
  selector: 'app-consultation-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './consultation-vehicule-detail.component.html',
  styleUrl: './consultation-vehicule-detail.component.css'
})
export class ConsultationVehiculeDetailComponent implements OnInit, OnDestroy, AfterViewInit  {

  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree = new BonEntree();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  // public numeroBonEntree: string = '';
  // public dateBonEntree: string = '';
  // public raisonSociale: any = '';
  // public dateBordereauLivraison: string = '';
  // public numeroBordereauLivraison: string = '';
  // public lieuDeLivraison: string = '';

  
  public identifiantBE: string = '';
  public numeroSerie: string = '';
  public libelleArticleBonEntree: string = '';
  

  @ViewChild('dataVehicule') data: any;

  ngAfterViewInit() {
    console.log(this.data);
    
    // Vous pouvez maintenant accéder aux propriétés du composant enfant
    if (this.data) {
      // this.numeroBonEntree = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.numeroBonEntree;
      // this.dateBonEntree = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.dateBonEntree;
      // this.raisonSociale = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBL.ninea.raisonSociale;
      // this.dateBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBL.dateBordereauLivraison;
      // this.numeroBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBL.numeroBordereauLivraison;
      // this.lieuDeLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBonEntree.identifiantBL.lieuDeLivraison;

      this.numeroSerie = this.data.vehicule.numeroSerie;
      this.libelleArticleBonEntree = this.data.vehicule.codeArticleBonEntree.libelleArticleBonEntree;
      this.identifiantBE = this.data.vehicule.codeArticleBonEntree.identifiantBE;

      this.recupererBonEntreeById(this.identifiantBE);
      this.recupererDotationVehiculeById(this.numeroSerie);

      // Déclencher manuellement la détection des changements si nécessaire
      this.cdr.detectChanges();
    }
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConsultationVehiculeDetailComponent>,
    private matDialog: MatDialog,
    private myDateService: MyDateService,
    private bonEntreeService: BonEntreeService,
    private dotationVehiculeService: DotationVehiculeService,
    private bonSortieService: BonSortieService,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.recupererBonEntreeById(this.identifiantBE);
    // this.recupererDotationVehiculeById(this.numeroSerie);

    // this.recupererBonEntreeById(this.data.vehicule.codeArticleBonEntree.identifiantBonEntree);

    // this.recupererArticleBonEntreeById(this.data.vehicule.codeArticleBonEntree.codeArticleBonEntree, this.data.vehicule.codeArticleBonEntree.identifiantBonEntree)
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


   // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  // public recupererArticleBonEntreeById(codeArticleBonEntree: number, identifiantBonEntree: string): void {

  //   const subscription = this.articleBonEntreeService.recupererArticleBonEntreeById(codeArticleBonEntree, identifiantBonEntree).subscribe({
  //     next: (response: ArticleBonEntree) => {
  //       this.articleBonEntree = response;
  //       // console.log(this.prestataires);
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
  public recupererDotationVehiculeById(numeroSerie: string): void {

    this.subscriptions.push(this.dotationVehiculeService.recupererDotationVehiculeByNumeroSerie(numeroSerie).subscribe({
      next: (response: DotationVehicule) => {
        this.dotationVehicule = response;

        this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)

        
        
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));
    
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererBonsortieById(identifiantBonSortie: string): void {

    if (identifiantBonSortie != "") {
      this.subscriptions.push(this.bonSortieService.recupererBonSortieById(identifiantBonSortie).subscribe({
        next: (response: BonSortie) => {
          this.bonSortie = response;
        },
        error: (errorResponse: HttpErrorResponse) => {
  
        }
      }));
    }

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererBonEntreeById(identifiantBonEntree: string): void {

    if (identifiantBonEntree != "") {
      const subscription = this.bonEntreeService.recupererBonEntreeById(identifiantBonEntree).subscribe({
        next: (response: BonEntree) => {
          this.bonEntree = response;
          // console.log(this.bonEntree);
        },
        error: (errorResponse: HttpErrorResponse) => {
          // console.log(errorResponse);
        },
      });
  
      this.subscriptions.push(subscription);
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  

  // supprimerVehiculeById(numeroSerie: String): void {

  //   const dialogRef = this.matDialog.open(
  //     PopupConfirmationSupprimerComponent,
  //     {
  //       width: '40%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms',
  //       data: {
  //         id: numeroSerie,
  //         categorie: "vehicule",
  //         message: "Voulez-vous supprimer ce véhicule?"
  //       }
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.popupFermer();
  //   });
  // }

  popupFermer(): void {
    this.dialogRef.close();
  }

  myDateStringFormatter(date: MyDate | string | undefined): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

}
