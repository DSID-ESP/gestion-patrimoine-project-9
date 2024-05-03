import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EtatBonPour } from 'src/app/enum/etat-bon-pour.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Agent } from 'src/app/model/agent.model';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { AgentService } from 'src/app/services/agent.service';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { FonctionUtilisateurService } from 'src/app/services/fonction-utilisateur.service';
import { NotificationService } from 'src/app/services/notification.service';
import { VehiculeService } from 'src/app/services/vehicule.service';

@Component({
  selector: 'app-vehicule-ajouter-dotation',
  // standalone: true,
  // imports: [],
  templateUrl: './vehicule-ajouter-dotation.component.html',
  styleUrl: './vehicule-ajouter-dotation.component.css'
})
export class VehiculeAjouterDotationComponent implements OnInit, OnDestroy {

  checkArray: FormArray | undefined;
  public vehiculeForm!: FormGroup;

  public vehiculesSelect: Vehicule[] = [];
  // public vehiculesSelected: Vehicule[] = [];
  // public vehiculesSelectedBefore: Vehicule[] = [];

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour = new ArticleBonPour();

  public bonPours: BonPour[] = [];
  public bonPour: BonPour = new BonPour();

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree = new ArticleBonEntree();


  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();


  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie = new ArticleBonSortie();






  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();


  public agents: Agent[] = [];
  public agent: Agent = new Agent();


  private subscriptions: Subscription[] = [];


  public utilisateurs: Utilisateur[] = [];
  public utilisateur: Utilisateur | undefined;



  estDLF: boolean = false;

  RETOURSECTION: EtatBonPour = EtatBonPour.RETOURSECTION;
  RETOURBLM: EtatBonPour = EtatBonPour.RETOURBLM;
  RETOURDLF: EtatBonPour = EtatBonPour.RETOURDLF;


  // ----------------------------------------------------------------------------------

  etatsBonPourArray = Object.values(EtatBonPour);

  constructor(
    public dialogRef: MatDialogRef<VehiculeAjouterDotationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articleBonPour: ArticleBonPour, articleBonSortie: ArticleBonSortie, bonSortie: BonSortie,bonPour:BonPour },
    private matDialog: MatDialog,
    private fb: FormBuilder,
    private bonSortieService: BonSortieService,
    private agentService: AgentService,
    private articleBonSortieService: ArticleBonSortieService,
    private dotationVehiculeService: DotationVehiculeService,
    private vehiculeService: VehiculeService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private notificationService: NotificationService,
    private fonctionUtilisateurService: FonctionUtilisateurService,
    private bonPourService: BonPourService
  ) { }




  ngOnInit(): void {

    this.checkArray = this.fb.array([]);

    this.vehiculeForm = this.fb.group({
      checkArray: this.checkArray,
    });

    this.vehiculesSelect = this.checkArray.value;


    this.articleBonPour = this.data.articleBonPour;
    this.articleBonSortie = this.data.articleBonSortie;
    this.bonSortie = this.data.bonSortie;
    this.bonPour = this.data.bonPour;

    // this.vehiculesSelectedBefore = this.vehiculesSelected = this.data.vehiculesSelected;
    // console.log(this.vehiculesSelectBefore);
    this.listeAgents();
    this.listeVehicules();
    this.listeDotations()
    // this.listeBonDeSorties();


    this.utilisateur = this.fonctionUtilisateurService.getUtilisateur;
    this.estDLF = this.fonctionUtilisateurService.estDLF;
  }

  etatSuivant(etatBonPour: EtatBonPour): EtatBonPour {
    const currentIndex = this.etatsBonPourArray.indexOf(etatBonPour);
    const nextIndex = (currentIndex + 1) % this.etatsBonPourArray.length;
    return this.etatsBonPourArray[nextIndex];
  }





   vehiculesNonDotes(vehicules: Vehicule[], dotationVehicules: DotationVehicule[]): Vehicule[] {
    // Filtrer les véhicules qui ne sont pas dotés
    const vehiculesNonDotes = vehicules.filter(vehicule =>
        !dotationVehicules.some(dotationVehicule => dotationVehicule.numeroSerie.numeroSerie === vehicule.numeroSerie)
    );

    return vehiculesNonDotes;
}





// filtreVehicules(vehicules: Vehicule[], dotationVehicules: DotationVehicule[]): Vehicule[] {
//   const vehiculesNonDotes: Vehicule[] = [];

//   // Parcourir tous les véhicules
//   for (const vehicule of vehicules) {
//       let isInDotation = false;

//       // Vérifier si le véhicule est dans une dotation
//       for (const dotationVehicule of dotationVehicules) {
//           if (dotationVehicule.numeroSerie && dotationVehicule.numeroSerie.numeroSerie.includes(vehicule.numeroSerie)) {
//               isInDotation = true;
//               break; // Sortir de la boucle dès que le véhicule est trouvé dans une dotation
//           }
//       }

//       // Si le véhicule n'est pas dans une dotation, l'ajouter à la liste des véhicules non dotés
//       if (!isInDotation) {
//           vehiculesNonDotes.push(vehicule);
//       }
//   }

//   // Retourner la liste des véhicules non dotés
//   return vehiculesNonDotes;
// }




  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }


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





  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {
        this.vehicules = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  public listeDotations(): void {

    const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
      next: (response: DotationVehicule[]) => {
        this.dotationVehicules = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }




  public validerDotationVehicule(articleBonSortie: ArticleBonSortie, vehiculesSelect: Vehicule[]): void {

    let dotationVehicule: DotationVehicule = new DotationVehicule();


     console.log(articleBonSortie);
     console.log(vehiculesSelect);


    for (const vehicule of vehiculesSelect) {



      dotationVehicule.codeArticleBonSortie = articleBonSortie;
      dotationVehicule.matriculeAgent = this.agents[0];
      dotationVehicule.numeroSerie = vehicule;
      dotationVehicule.dateDotation = null;

      console.log(dotationVehicule);


      this.subscriptions.push(this.dotationVehiculeService.ajouterDotationVehicule(dotationVehicule).subscribe({
        next: (response: DotationVehicule) => {

          console.log(response);
          this.popupFermer();

        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
      );
    }


  }


  public terminerBonPour(bonPour: BonPour): void {


    if (this.estDLF) {
      bonPour.etatBonPour = this.etatSuivant(EtatBonPour.RETOURDLF); // this.bonPour.etatBonPour
    }




    // -----------------------------------------------------------------------------

    this.subscriptions.push(this.bonPourService.modifierBonPour(bonPour).subscribe({
      next: (response: BonPour) => {
        // console.log(response);
        this.sendNotification(NotificationType.SUCCESS, `Bon pour transmis`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        // this.sendNotification(NotificationType.ERROR, errorResponse.error);
      }
    })
    );
  }



  public ajouterArticleBonSortie(articleBonSortie: ArticleBonSortie, vehiculesSelect: Vehicule[]): void {


    if (vehiculesSelect.length == articleBonSortie.quantiteAccordeeDefinitive ) {

      this.subscriptions.push(this.articleBonSortieService.modifierArticleBonSortie(this.articleBonSortie).subscribe({
        next: (response: ArticleBonSortie) => {
          // this.articleBonSortie = articleBonSortie;

          console.log(response);


          this.validerDotationVehicule(response, vehiculesSelect);
          this.terminerBonPour(this.bonPour);

          // console.log(response);

        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
      );

    }

    else {

      this.sendNotification(NotificationType.ERROR, `Veillez sélectionner une quantité de ${articleBonSortie.quantiteAccordeeSection} véhicule(s)`);

    }





  }

  retourner(): void {
    // this.vehiculesSelect = this.vehiculesSelectedBefore;
    this.popupFermer();
  }





  // isChecked(vehicule: Vehicule, vehiculesSelected: Vehicule[]): boolean {



  //   if (vehiculesSelected && vehiculesSelected.length > 0) {
  //       return vehiculesSelected.some(selected => {

  //           return selected.identifiantBE.libelleArticleBonEntree === vehicule.identifiantBE.libelleArticleBonEntree;
  //       });
  //   }

  //   return false;
  // }






  onCheckboxChange(event: any, vehicule: Vehicule) {
    this.checkArray = this.vehiculeForm.get('checkArray') as FormArray;

    if (event.target.checked) {
      if (this.checkArray) {
        this.checkArray.push(new FormControl(vehicule));
        console.log(this.checkArray.value);
      }
    } else {
      const index = this.checkArray.controls.findIndex(x => x.value === vehicule);
      this.checkArray.removeAt(index);
      console.log(this.checkArray.value);
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
