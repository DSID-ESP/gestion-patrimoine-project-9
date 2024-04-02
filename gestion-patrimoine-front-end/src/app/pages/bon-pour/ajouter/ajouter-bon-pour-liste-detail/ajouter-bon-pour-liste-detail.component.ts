import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonPour } from 'src/app/model/bon-pour.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { MatPaginator } from '@angular/material/paginator';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { AjouterBonPourAjouterArticleComponent } from '../ajouter-bon-pour-ajouter-article/ajouter-bon-pour-ajouter-article.component';
import { AjouterBonPourModifierComponent } from '../ajouter-bon-pour-modifier/ajouter-bon-pour-modifier.component';
import { AjouterBonPourDetailComponent } from '../ajouter-bon-pour-detail/ajouter-bon-pour-detail.component';

@Component({
  selector: 'app-ajouter-bon-pour-liste-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './ajouter-bon-pour-liste-detail.component.html',
  styleUrl: './ajouter-bon-pour-liste-detail.component.css'
})
export class AjouterBonPourListeDetailComponent implements OnInit, OnDestroy {


  public bonPours: BonPour[] = [];
  public bonPour: BonPour | undefined;

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour | undefined;


  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  rowNumber!: number; // numéro de ligne pour le tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [
  ];
  columnsToHide: string[] = [
  ];

  dataSource = new MatTableDataSource<ArticleBonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowNumber",
    // "codeArticleBonPour",
    "libelleArticleBonPour",
    "quantiteDemandee",
    "rowCodeTypeObjet"
  ];
  displayedColumnsCustom: string[] = [
    "N°",
    // "Code article",
    "Libellé article",
    "Quantité Demandée",
    "Type objet"
  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private bonPourService: BonPourService,
    private articleBonPourService: ArticleBonPourService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private securiteService: SecuriteService,
    private myDateService: MyDateService
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {


    // --------------------------------------------------------------------------------
    const id = this.route.snapshot.paramMap.get('identifiantBonPour') ?? '';

    const decrypt = this.securiteService.decryptUsingAES256(id);

    // console.log(id);
    // console.log(decrypt);



    if (decrypt) {
      // this.utilisateurService.getUtilisateurByUtilisateurId(+utilisateurId).subscribe(pokemon => this.pokemon = pokemon);
      this.subscriptions.push(this.bonPourService.recupererBonPourById(decrypt).subscribe({
        next: (response: BonPour) => {
          this.bonPour = response;
          // console.log(this.bonEntree);
          this.listeArticleBonPours();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      }));
    }
    // --------------------------------------------------------------------------------
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeArticleBonPours(): void {

    const subscription = this.articleBonPourService.listeArticleBonPours().subscribe({
      next: (response: ArticleBonPour[]) => {
        this.articleBonPours = response;
        // console.log(this.articleBonPours);

        // this.articleBonPours = response.sort((a, b) => Number(a.quantiteDemandee) - Number(b.quantiteDemandee));

        if (this.bonPour) {
          this.filtreArticleBonPourByBonPour(this.articleBonPours, this.bonPour);
        } else {
          console.error('articleBonPours is undefined');
        }
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------





  // nombreArticleBonEntree(bonEntree: BonEntree, articleBonEntrees: ArticleBonEntree[]): number {
  //   let nombreArticleBonEntree = 0;

  //   for (const articleBonEntree of articleBonEntrees) {
  //     // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
  //     if (bonEntree && articleBonEntree.identifiantBE && JSON.stringify(bonEntree) === JSON.stringify(articleBonEntree.identifiantBE)) {
  //       nombreArticleBonEntree++;
  //     }
  //   }

  //   return nombreArticleBonEntree;
  // }


  filtreArticleBonPourByBonPour(articleBonPours: ArticleBonPour[], bonPour: BonPour): void {

    articleBonPours = articleBonPours.filter((articleBonPour: ArticleBonPour) => {
      return articleBonPour.identifiantBonPour && bonPour.identifiantBonPour && articleBonPour.identifiantBonPour === bonPour.identifiantBonPour;
    }).sort((a, b) => Number(a.quantiteDemandee) - Number(b.quantiteDemandee));

    this.rowNumber = 1;

    // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
    this.dataSource = new MatTableDataSource<ArticleBonPour>(articleBonPours.map((item) => ({
      ...item,
      rowCodeTypeObjet: item.codeTypeObjet.libelleTypeObjet,
      rowNumber: this.rowNumber++,
    })));


    // console.log(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }



  popupAjouterArticle(bonPour: BonPour | undefined): void {
    const dialogRef = this.matDialog.open(
      AjouterBonPourAjouterArticleComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: bonPour
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  popupModifierBonPour(bonPour: BonPour | undefined): void {
    const dialogRef = this.matDialog.open(
      AjouterBonPourModifierComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: bonPour
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  popupDetail(articleBonPour: ArticleBonPour): void {
    const dialogRef = this.matDialog.open(
      AjouterBonPourDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: articleBonPour
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
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
