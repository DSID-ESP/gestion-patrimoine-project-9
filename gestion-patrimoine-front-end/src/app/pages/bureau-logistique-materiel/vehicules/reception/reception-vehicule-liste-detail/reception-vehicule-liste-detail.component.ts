import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyDateService } from 'src/app/services/my-date.service';
import { MyDate } from 'src/app/model/my-date.model';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';

@Component({
  selector: 'app-reception-vehicule-liste-detail',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './reception-vehicule-liste-detail.component.html',
  styleUrl: './reception-vehicule-liste-detail.component.css'
})
export class ReceptionVehiculeListeDetailComponent implements OnInit, OnDestroy, AfterViewInit  {

  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree = new BonEntree();

  // public numeroBE: string = '';
  // public dateBonEntree: string = '';
  // public raisonSociale: any = '';
  // public dateBordereauLivraison: string = '';
  // public numeroBordereauLivraison: string = '';
  // public lieuDeLivraison: string = '';

  public numeroSerie: string = '';
  public libelleArticleBonEntree: string = '';
  

  @ViewChild('dataVehicule') data: any;

  ngAfterViewInit() {
    console.log(this.data);
    
    // Vous pouvez maintenant accéder aux propriétés du composant enfant
    if (this.data) {
      // this.numeroBE = this.data.vehicule.codeArticleBonEntree.identifiantBE.numeroBE;
      // this.dateBonEntree = this.data.vehicule.codeArticleBonEntree.identifiantBE.dateBonEntree;
      // this.raisonSociale = this.data.vehicule.codeArticleBonEntree.identifiantBE.identifiantBordereauLivraison.ninea.raisonSociale;
      // this.dateBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBE.identifiantBordereauLivraison.dateBordereauLivraison;
      // this.numeroBordereauLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBE.identifiantBordereauLivraison.numeroBordereauLivraison;
      // this.lieuDeLivraison = this.data.vehicule.codeArticleBonEntree.identifiantBE.identifiantBordereauLivraison.lieuDeLivraison;

      this.numeroSerie = this.data.vehicule.numeroSerie;
      this.libelleArticleBonEntree = this.data.vehicule.codeArticleBonEntree.libelleArticleBonEntree;

      console.log(this.data.vehicule.codeArticleBonEntree.identifiantBE);
      
      this.recupererBonEntreeById(this.data.vehicule.codeArticleBonEntree.identifiantBE);

      // Déclencher manuellement la détection des changements si nécessaire
      this.cdr.detectChanges();
    }
  }

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReceptionVehiculeListeDetailComponent>,
    private matDialog: MatDialog,
    private myDateService: MyDateService,
    private bonEntreeService: BonEntreeService,
    private cdr: ChangeDetectorRef // Ajout de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // console.log(this.vehicule);

    // this.recupererBonEntreeById(this.data.vehicule.codeArticleBonEntree.identifiantBE);

    // this.recupererArticleBonEntreeById(this.data.vehicule.codeArticleBonEntree.codeArticleBonEntree, this.data.vehicule.codeArticleBonEntree.identifiantBE)
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


   // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  // public recupererArticleBonEntreeById(codeArticleBonEntree: number, identifiantBE: string): void {

  //   const subscription = this.articleBonEntreeService.recupererArticleBonEntreeById(codeArticleBonEntree, identifiantBE).subscribe({
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
  public recupererBonEntreeById(identifiantBE: string): void {

    const subscription = this.bonEntreeService.recupererBonEntreeById(identifiantBE).subscribe({
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
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  

  supprimerVehiculeById(numeroSerie: String): void {

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: numeroSerie,
          categorie: "vehicule",
          message: "Voulez-vous supprimer ce véhicule?"
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.popupFermer();
    });
  }

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
