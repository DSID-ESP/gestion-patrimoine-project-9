import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PrestataireSecteurAjouterComponent } from 'src/app/pages/prestataire/prestataire-secteur-ajouter/prestataire-secteur-ajouter.component';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Vehicule } from 'src/app/model/vehicule.model';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { AgentService } from 'src/app/services/agent.service';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { Agent } from 'src/app/model/agent.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';

@Component({
  selector: 'app-dotation-vehicule-vehicule-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-vehicule-ajouter.component.html',
  styleUrl: './dotation-vehicule-vehicule-ajouter.component.css'
})
export class DotationVehiculeVehiculeAjouterComponent  implements OnInit, OnDestroy{

  checkArray: FormArray | undefined;
  public vehiculeForm!: FormGroup;

  public vehiculesSelect: Vehicule[] = [];
  public vehiculesSelected: Vehicule[] = [];
  public vehiculesSelectedBefore: Vehicule[] = [];

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();


  public bonDeSorties: BonSortie[] = [];
  public bonDeSortie: BonSortie = new BonSortie();


  public agents: Agent[] = [];
  public agent: Agent = new Agent();


  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DotationVehiculeVehiculeAjouterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicules: Vehicule[], bonDeSortie: BonSortie, vehiculesSelected: Vehicule[] },
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private bonSortieService: BonSortieService,
    private agentService: AgentService,
    private articleBonSortieService: ArticleBonSortieService,

    private dotationVehiculeService: DotationVehiculeService,

  ) {

  }




  ngOnInit(): void {
    this.vehicules = this.data.vehicules;
    this.bonDeSortie = this.data.bonDeSortie;
    this.vehiculesSelectedBefore = this.vehiculesSelected = this.data.vehiculesSelected;
    // console.log(this.vehiculesSelectBefore);
    this.listeAgents();
    this.listeBonDeSorties();
    // this.listeArticleBonEntrees();


    if (this.vehiculesSelected && this.vehiculesSelected.length > 0) {
      // If secteurActivitesSelected is not empty, initialize checkArray with its values
      this.checkArray = this.fb.array(this.vehiculesSelected.map(secteur => new FormControl(secteur)));
    } else {
      // If secteurActivitesSelected is empty, initialize an empty FormArray
      this.checkArray = this.fb.array([]);
    }

    this.vehiculeForm = this.fb.group({
      checkArray: this.checkArray,
    });

    this.vehiculesSelect = this.checkArray.value;


  }


  public listeBonDeSorties(): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonDeSorties = response;
        // this.bonDeSortie = this.filtreBonPourArticleBonSortie(this.articleBonPour.identifiantBP, this.bonDeSorties);
        console.log(this.bonDeSortie);



      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }

  // public listeArticleBonEntrees(): void {

  //   const subscription = this.articleBonEntreeService.listeArticleBonEntrees().subscribe({
  //     next: (response: ArticleBonEntree[]) => {
  //       this.articleBonEntrees = response;
  //       // this.bonDeSortie = this.filtreBonPourArticleBonSortie(this.articleBonPour.identifiantBP, this.bonDeSorties);
  //       console.log(this.articleBonEntree);



  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }


  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  validerVehicule(): void {

    this.ajouterArticleBonSortie( this.bonDeSortie,this.vehiculesSelect);


    this.popupFermer();
  }




  public ajouterArticleBonSortie( bonDeSortie: BonSortie, vehiculesSelect: Vehicule[]): void {

  // const dotationVehicule: DotationVehicule= new DotationVehicule();

  // const  articleBonSortie: ArticleBonSortie=  new ArticleBonSortie();


  //   articleBonSortie.codeArticleBonSortie= 'Article 4';
  //   articleBonSortie.identifiantBS= bonDeSortie;
  //   articleBonSortie.libelleArticleBonSortie= 'Article BS4';
  //   articleBonSortie.quantiteAccordee= 50;

    // dotationVehicule.matriculeAgent= this.agents[0];

    console.log(new ArticleBonSortie());



    // this.subscriptions.push(this.articleBonSortieService.ajouterArticleBonSortie(new ArticleBonSortie()).subscribe({
    //     next: (response: string) => {

    //       // console.log(response);
    //       this.ajouterDotationVehicule(new ArticleBonSortie(),vehiculesSelect);

    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );


    this.subscriptions.push(this.articleBonSortieService.listeArticleBonSorties().subscribe({
      next: (response: ArticleBonSortie[]) => {

         console.log(response);
        // this.ajouterDotationVehicule(new ArticleBonSortie(),vehiculesSelect);

      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    })
  );

  }



  public ajouterDotationVehicule( articleBonSortie: ArticleBonSortie, vehiculesSelect: Vehicule[]): void {

      const dotationVehicule: DotationVehicule= new DotationVehicule();


      dotationVehicule.codeArticleBonSortie= articleBonSortie;
      dotationVehicule.matriculeAgent= this.agents[0];



      this.subscriptions.push(this.dotationVehiculeService.ajouterDotationVehicule(dotationVehicule).subscribe({
          next: (response: DotationVehicule) => {

            console.log(response);

          },
          error: (errorResponse: HttpErrorResponse) => {

          }
        })
      );

    }

  retourner(): void {
    this.vehiculesSelect = this.vehiculesSelectedBefore;
    // console.log(this.secteurActivitesSelect);

    this.popupFermer();
  }


  // isChecked(secteurActivite: SecteurActivite): boolean {
  //   // Implémentez la logique pour déterminer si la case à cocher doit être cochée
  //   // Par exemple, retournez true si secteurActivite est sélectionné, sinon false
  //   // À adapter selon votre logique métier

  //   if (this.checkArray && this.checkArray.controls.length > 0) {
  //     // Utilisez some pour vérifier si secteurActivite existe dans le FormArray
  //     return this.checkArray.controls.some(control => control.value === secteurActivite);
  //   }
  //   // Si le FormArray est undefined ou vide, retournez false
  //   return false;
  // }

  // isChecked(secteurActivite: SecteurActivite, secteurActivitesSelected: SecteurActivite[]): boolean {
  //   if (this.checkArray && this.checkArray.controls.length > 0) {
  //       // Utilisez some pour vérifier si secteurActivite existe dans le FormArray
  //       return this.checkArray.controls.some(control => control.value === secteurActivite);
  //   }

  //   // Vérifie si secteurActivite existe dans la liste secteurActivitesSelected
  //   if (secteurActivitesSelected) {
  //     return secteurActivitesSelected.some(selected => {
  //         // Comparaison des identifiants uniques, à adapter selon votre modèle
  //         return selected.libelleSecteurActivite === secteurActivite.libelleSecteurActivite;
  //     });

  //   } else {
  //     return false;
  //   }

  // }

  isChecked(vehicule: Vehicule, vehiculesSelected: Vehicule[]): boolean {
    // Vérifie si secteurActivite existe dans le FormArray
    // if (this.checkArray && this.checkArray.controls.length > 0) {
    //     const isAlreadyChecked = this.checkArray.controls.some(control => control.value === secteurActivite);
    //     if (isAlreadyChecked) {
    //         return true;
    //     }
    // }

    // Vérifie si secteurActivite existe dans la liste secteurActivitesSelected
    if (vehiculesSelected && vehiculesSelected.length > 0) {
        return vehiculesSelected.some(selected => {
            // Comparaison des identifiants uniques, à adapter selon votre modèle
            return selected.codeArticleBonEntree.libelleArticleBonEntree === vehicule.codeArticleBonEntree.libelleArticleBonEntree;
        });
    }

    return false;
  }






  onCheckboxChange(event: any, vehicule: Vehicule) {
    this.checkArray = this.vehiculeForm.get('checkArray') as FormArray;

    if (event.target.checked) {
      if (this.checkArray) {
        this.checkArray.push(new FormControl(vehicule));
        // console.log(this.checkArray.value);
      }
    } else {
      const index = this.checkArray.controls.findIndex(x => x.value === vehicule);
      this.checkArray.removeAt(index);
      // console.log(this.checkArray.value);
    }

    this.vehiculesSelect = this.checkArray.value;
    // console.log(this.secteurActivitesSelect);
  }





  popupFermer(): void {
    this.dialogRef.close();
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
