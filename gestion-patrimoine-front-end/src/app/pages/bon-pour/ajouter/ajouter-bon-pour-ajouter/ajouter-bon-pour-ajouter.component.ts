import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BonPour } from 'src/app/model/bon-pour.model';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  // ----------------------------------------------------------------------------------

  etatBonPour: string = EtatBonPour.INITIAL;

  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;
  modelDate2: NgbDateStruct | null = null;
  modelDate3: NgbDateStruct | null = null;
  modelDate4: NgbDateStruct | null = null;

  formatDate(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }

    // Crée un objet JavaScript Date à partir de NgbDateStruct
    const jsDate = new Date(date.year, date.month - 1, date.day);

    // Utilise DatePipe pour formater la date avec le mois complet
    return this.datePipe.transform(jsDate, 'dd MMMM yyyy') || '';
  }
  // ----------------------------------------------------------------------------------

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
    private securiteService: SecuriteService,
    private matDialog: MatDialog,
    private fonctionUtilisateurService: FonctionUtilisateurService,
    private notificationService: NotificationService
  ) {}

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {
    this.listeUniteDouanieres();
    this.listeSections();
    this.listeAgents();

    this.utilisateur = this.fonctionUtilisateurService.getUtilisateur;

    this.tousPrivileges = this.fonctionUtilisateurService.tousPrivileges;
    this.bonPourAjouterSection = this.fonctionUtilisateurService.bonPourAjouterSection;
    this.bonPourAjouterBLM = this.fonctionUtilisateurService.bonPourAjouterBLM;
    this.bonPourAjouterDLF = this.fonctionUtilisateurService.bonPourAjouterDLF;
    this.bonPourAjouterInitial = this.fonctionUtilisateurService.bonPourAjouterInitial;

    // console.log('bonPourAjouterSection', this.bonPourAjouterSection);
    // console.log('bonPourAjouterBLM', this.bonPourAjouterBLM);
    // console.log('bonPourAjouterDLF', this.bonPourAjouterDLF);
    // console.log('bonPourAjouterInitial', this.bonPourAjouterInitial);

    // console.log(this.utilisateur);
    

    this.filteredUniteDouanieres = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
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

    if (!this.uniteDouaniere!.codeUniteDouaniere) {
      // this.condition = false;
      this.sendNotification(NotificationType.ERROR, `Veuillez sélectionnez une unité!`);
      return;
    }

    const bp: BonPour = new BonPour();

    bp.identifiantBonPour = null;
    bp.descriptionBonPour = BonPourForm.value.descriptionBonPour;
    bp.etatBonPour = EtatBonPour.INITIAL;
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
    
    bp.numeroArriveBLM = null;
    bp.numeroArriveDLF = null;
    bp.numeroArriveSection = null;
    bp.dateArriveBLM = null;
    bp.dateArriveDLF = null;
    bp.dateArriveSection = null;
    bp.observationBLM = null;
    bp.observationDLF = null;
    bp.observationSection = null;

    console.log(bp);
    

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
