import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BonPour } from 'src/app/model/bon-pour.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecuriteService } from 'src/app/services/securite.service';
import { AgentService } from 'src/app/services/agent.service';
import { SectionsService } from 'src/app/services/sections.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MyDate } from 'src/app/model/my-date.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FonctionUtilisateurService } from 'src/app/services/fonction-utilisateur.service';
import { EtatBonPour } from 'src/app/enum/etat-bon-pour.enum';
import { Utilisateur } from 'src/app/model/utilisateur.model';
import { MyDateService } from 'src/app/services/my-date.service';

@Component({
  selector: 'app-ajouter-bon-pour-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './ajouter-bon-pour-ajouter.component.html',
  styleUrl: './ajouter-bon-pour-ajouter.component.css'
})
export class AjouterBonPourAjouterComponent implements OnInit, OnDestroy {

  tousPrivileges: boolean = false;
  bonPourAjouterSection: boolean = false;
  bonPourAjouterBLM: boolean = false;
  bonPourAjouterDLF: boolean = false;
  bonPourAjouterInitial: boolean = false;

  // estBAF: boolean = false;
  // estDLF: boolean = false;

  // ----------------------------------------------------------------------------------

  // tousPrivileges: boolean = false;
  // bonPourAjouterSection: boolean = false;
  // bonPourAjouterBLM: boolean = false;
  // bonPourAjouterDLF: boolean = false;
  // bonPourAjouterInitial: boolean = false;
  estBAF: boolean = false;
  estDLF: boolean = false;
  estBLM: boolean = false;
  estSection: boolean = false;

  // ----------------------------------------------------------------------------------

  etatsBonPourArray = Object.values(EtatBonPour);
  etatBonPour: EtatBonPour = EtatBonPour.INITIAL;

  INITIAL: EtatBonPour = EtatBonPour.INITIAL;
  BAF: EtatBonPour = EtatBonPour.BAF;
  ALLERDLF: EtatBonPour = EtatBonPour.ALLERDLF;
  ALLERBLM: EtatBonPour = EtatBonPour.ALLERBLM;
  ALLERSECTION: EtatBonPour = EtatBonPour.ALLERSECTION;
  RETOURSECTION: EtatBonPour = EtatBonPour.RETOURSECTION;

  
  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;
  modelDate2: NgbDateStruct | null = null;
  modelDate3: NgbDateStruct | null = null;
  modelDate4: NgbDateStruct | null = null;
  
  dateCourrielOrigine: string = "";
  dateArriveBLM: string = "";
  dateArriveDLF: string = "";

  formatDateModelNgbDateStruct(date: NgbDateStruct | MyDate | string | null): string {
    return this.myDateService.formatDateModelNgbDateStruct(date);
  }

  formatterStringToNgbDateStruct(date: string): NgbDateStruct {
    return this.myDateService.formatterStringToNgbDateStruct(date);
  }
  // ----------------------------------------------------------------------------------

  // public bonPours: BonPour[] = [];
  // public bonPour: BonPour | undefined;

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour | undefined;

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public sections: Sections[] = [];
  public section: Sections | undefined;

  public agents: Agent[] = [];
  public agent: Agent | undefined;

  public utilisateurs: Utilisateur[] = [];
  public utilisateur: Utilisateur | undefined;

  control = new FormControl('');
  
  filteredUniteDouanieres: Observable<UniteDouaniere[]> | undefined;

  private subscriptions: Subscription[] = [];

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AjouterBonPourAjouterComponent>,
    private router: Router,
    // private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private uniteDouaniereService: UniteDouaniereService,
    private sectionsService: SectionsService,
    private agentService: AgentService,
    private fonctionUtilisateurService: FonctionUtilisateurService,
    private notificationService: NotificationService,
    private myDateService: MyDateService,
    @Inject(MAT_DIALOG_DATA) public bonPour: BonPour

  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {

    const dateCourrielOrigine = this.bonPour?.dateCourrielOrigine?.toString();
    const dateArriveDLF = this.bonPour?.dateArriveDLF?.toString();
    const dateArriveBLM = this.bonPour?.dateArriveBLM?.toString();

    if (dateCourrielOrigine) {
      this.dateCourrielOrigine = this.formatDateModelNgbDateStruct(dateCourrielOrigine);      
    }

    if (dateArriveDLF) {
      this.dateArriveDLF = this.formatDateModelNgbDateStruct(dateArriveDLF);      
    }

    if (dateArriveBLM) {
      this.dateArriveBLM = this.formatDateModelNgbDateStruct(dateArriveBLM);      
    }

    this.listeUniteDouanieres();
    this.listeSections();
    this.listeAgents();

    // console.log(this.bonPour);
    

    this.utilisateur = this.fonctionUtilisateurService.getUtilisateur;

    this.tousPrivileges = this.fonctionUtilisateurService.tousPrivileges;
    this.bonPourAjouterSection = this.fonctionUtilisateurService.bonPourAjouterSection;
    this.bonPourAjouterBLM = this.fonctionUtilisateurService.bonPourAjouterBLM;
    this.bonPourAjouterDLF = this.fonctionUtilisateurService.bonPourAjouterDLF;
    this.bonPourAjouterInitial = this.fonctionUtilisateurService.bonPourAjouterInitial;
    // ----------------------------------------------
    // this.estBAF = this.fonctionUtilisateurService.estBAF;
    // this.estDLF = this.fonctionUtilisateurService.estDLF;

    // console.log('bonPourAjouterSection', this.bonPourAjouterSection);
    // console.log('bonPourAjouterBLM', this.bonPourAjouterBLM);
    // console.log('bonPourAjouterDLF', this.bonPourAjouterDLF);
    // console.log('bonPourAjouterInitial', this.bonPourAjouterInitial);

    // console.log(this.bonPourAjouterSection);




    this.filteredUniteDouanieres = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  etatSuivant(etatBonPour: EtatBonPour): EtatBonPour {
    const currentIndex = this.etatsBonPourArray.indexOf(etatBonPour);
    const nextIndex = (currentIndex + 1) % this.etatsBonPourArray.length;
    return this.etatsBonPourArray[nextIndex];
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
  private _filter(value: string): UniteDouaniere[] {

    if (value == "") {
      this.uniteDouaniere = new UniteDouaniere();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let uniteDouaniereTrouve = this.uniteDouanieres.find(uniteDouaniere => this._normalizeValue(uniteDouaniere.nomUniteDouaniere) === value.toLocaleLowerCase());
    if (uniteDouaniereTrouve) {
      this.uniteDouaniere = uniteDouaniereTrouve;
    } else {
      this.uniteDouaniere = new UniteDouaniere();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listeUniteDouanieres = this.uniteDouanieres.filter(uniteDouaniere => this._normalizeValue(uniteDouaniere.nomUniteDouaniere).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeUniteDouanieres;
  }

  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedNomUniteDouaniere = event.option.value;
    this.uniteDouaniere = this.uniteDouanieres.find(uniteDouaniere => uniteDouaniere.nomUniteDouaniere === selectedNomUniteDouaniere) ?? new UniteDouaniere();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

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


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeSections(): void {

    const subscription = this.sectionsService.listeSections().subscribe({
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
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
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


  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('bon-pour-form');
  }


  // --------------------------------------------------------------------------

  // pour executer ajouterBonEntree
  public submitBonPourForm(): void {
    this.clickButton('bon-pour-form')
  }

  public ajouterBonPour(BonPourForm: NgForm): void {

    if (this.uniteDouaniere?.codeUniteDouaniere == "") {
      // this.condition = false;
      this.sendNotification(NotificationType.ERROR, `Veuillez sélectionnez une unité!`);
      return;
    }

    const bp: BonPour = new BonPour();
    

    bp.identifiantBonPour = null;
    bp.descriptionBonPour = BonPourForm.value.descriptionBonPour;
    bp.etatBonPour = this.etatSuivant(BonPourForm.value.etatBonPour);
    bp.codeSection = this.utilisateur?.matriculeAgent.codeSection ?? new Sections();
    bp.codeUniteDouaniere = this.uniteDouaniere ?? new UniteDouaniere();
    bp.numeroCourrielOrigine = BonPourForm.value.numeroCourrielOrigine;

    const dateCourrielOrigine: MyDate = BonPourForm.value.dateCourrielOrigine;
    const formattedDate1 = this.bonPourService.formatterMyDate(dateCourrielOrigine);
    if (formattedDate1) {
      bp.dateCourrielOrigine = formattedDate1;
    } else {
      console.log("erreur date courriel origine");
    }

    bp.objectCourrielOrigine = BonPourForm.value.objectCourrielOrigine;
    bp.matriculeAgent = this.utilisateur?.matriculeAgent ?? new Agent();
    bp.dateEnregistrement = null;
    // ---------------------------------------------------
    bp.numeroArriveDLF = null;    
    bp.dateArriveDLF = null;
    bp.observationDLF = null;

    if (this.bonPourAjouterDLF) {
      // ------------------------BAF----------------------------------------
      bp.identifiantBonPour = this.bonPour.identifiantBonPour;
      bp.descriptionBonPour = this.bonPour.descriptionBonPour;
      bp.etatBonPour = this.etatSuivant(EtatBonPour.ALLERDLF); // this.bonPour.etatBonPour  
      bp.codeSection = this.bonPour.codeSection;
      bp.codeUniteDouaniere = this.bonPour.codeUniteDouaniere;
      bp.numeroCourrielOrigine = this.bonPour.numeroCourrielOrigine;
      bp.dateCourrielOrigine = this.bonPour.dateCourrielOrigine;
   

      bp.objectCourrielOrigine = this.bonPour.objectCourrielOrigine;
      bp.matriculeAgent = this.bonPour.matriculeAgent;
      bp.dateEnregistrement = this.bonPour.dateEnregistrement;

      // ------------------------DLF----------------------------------------
      bp.numeroArriveDLF = BonPourForm.value.numeroArriveDLF;
      const dateArriveDLF: MyDate = BonPourForm.value.dateArriveDLF;
      const formattedDateDLF = this.bonPourService.formatterMyDate(dateArriveDLF);
      if (formattedDateDLF) {
        bp.dateArriveDLF = formattedDateDLF;
      } else {
        console.log("erreur date courriel origine");
      }
      bp.observationDLF = BonPourForm.value.observationDLF;
    }
    // ---------------------------------------------------
    bp.numeroArriveBLM = null;    
    bp.dateArriveBLM = null;
    bp.observationBLM = null;

    if (this.bonPourAjouterBLM) {
      // ------------------------BAF----------------------------------------
      bp.identifiantBonPour = this.bonPour.identifiantBonPour;
      bp.descriptionBonPour = this.bonPour.descriptionBonPour;
      bp.etatBonPour = this.etatSuivant(EtatBonPour.ALLERBLM); // this.bonPour.etatBonPour
      bp.codeSection = this.bonPour.codeSection;
      bp.codeUniteDouaniere = this.bonPour.codeUniteDouaniere;
      bp.numeroCourrielOrigine = this.bonPour.numeroCourrielOrigine;
      bp.dateCourrielOrigine = this.bonPour.dateCourrielOrigine;
   

      bp.objectCourrielOrigine = this.bonPour.objectCourrielOrigine;
      bp.matriculeAgent = this.bonPour.matriculeAgent;
      bp.dateEnregistrement = this.bonPour.dateEnregistrement;

      // ------------------------DLF----------------------------------------
      bp.numeroArriveDLF = this.bonPour.numeroArriveDLF;
      bp.dateArriveDLF = this.bonPour.dateArriveDLF;
      bp.observationDLF = this.bonPour.observationDLF;

      // ------------------------BLM----------------------------------------
      bp.numeroArriveBLM = BonPourForm.value.numeroArriveBLM;
      const dateArriveBLM: MyDate = BonPourForm.value.dateArriveBLM;
      const formattedDateBLM = this.bonPourService.formatterMyDate(dateArriveBLM);
      if (formattedDateBLM) {
        bp.dateArriveBLM = formattedDateBLM;
      } else {
        console.log("erreur date courriel origine");
      }
      bp.observationBLM = BonPourForm.value.observationBLM;
    }
    // ---------------------------------------------------
    bp.numeroArriveSection = null;
    bp.dateArriveSection = null;    
    bp.observationSection = null;

    if (this.bonPourAjouterSection) {
      // ------------------------BAF----------------------------------------
      bp.identifiantBonPour = this.bonPour.identifiantBonPour;
      bp.descriptionBonPour = this.bonPour.descriptionBonPour;
      bp.etatBonPour = this.etatSuivant(EtatBonPour.ALLERSECTION); // this.bonPour.etatBonPour
      bp.codeSection = this.bonPour.codeSection;
      bp.codeUniteDouaniere = this.bonPour.codeUniteDouaniere;
      bp.numeroCourrielOrigine = this.bonPour.numeroCourrielOrigine;
      bp.dateCourrielOrigine = this.bonPour.dateCourrielOrigine;
   

      bp.objectCourrielOrigine = this.bonPour.objectCourrielOrigine;
      bp.matriculeAgent = this.bonPour.matriculeAgent;
      bp.dateEnregistrement = this.bonPour.dateEnregistrement;

      // ------------------------DLF----------------------------------------
      bp.numeroArriveDLF = this.bonPour.numeroArriveDLF;
      bp.dateArriveDLF = this.bonPour.dateArriveDLF;
      bp.observationDLF = this.bonPour.observationDLF;

      // ------------------------BLM----------------------------------------
      bp.numeroArriveBLM = this.bonPour.numeroArriveBLM;
      bp.dateArriveBLM = this.bonPour.dateArriveBLM;
      bp.observationBLM = this.bonPour.observationBLM;

      // ------------------------SECTION----------------------------------------
      bp.numeroArriveSection = BonPourForm.value.numeroArriveSection;
      const dateArriveSection: MyDate = BonPourForm.value.dateArriveSection;
      const formattedDateSection = this.bonPourService.formatterMyDate(dateArriveSection);
      if (formattedDateSection) {
        bp.dateArriveSection = formattedDateSection;
      } else {
        console.log("erreur date courriel origine");
      }
      bp.observationSection = BonPourForm.value.observationSection;
    }
    // -----------------------------------------------------------------------------
    
    this.subscriptions.push(this.bonPourService.ajouterBonPour(bp).subscribe({
        next: (response: BonPour) => {
          console.log(response);
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du bon pour`);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          // this.sendNotification(NotificationType.ERROR, errorResponse.error);
        }
      })
    );
  }
  // --------------------------------------------------------------------------



  // onSubmit(): void {
  //   // console.log(this.vehiculeForm.value);
  //   // this.AjouterVehicule();
  // }

}
