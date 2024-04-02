import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Accident } from 'src/app/model/accident';
import { ChangementPiece } from 'src/app/model/changement-piece';
import { Maintenance } from 'src/app/model/maintenance';
import { MyDate } from 'src/app/model/my-date.model';
import { Reparation } from 'src/app/model/reparation';
import { Vehicule } from 'src/app/model/vehicule.model';
import { Vidange } from 'src/app/model/vidange';
import { ChangementPieceService } from 'src/app/services/changement-piece.service';
import { AccidentService } from 'src/app/services/accident.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ReparationService } from 'src/app/services/reparation.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { VidangeService } from 'src/app/services/vidange.service';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { BonSortie } from 'src/app/model/bon-sortie.model';

@Component({
  selector: 'app-maintenance-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './maintenance-ajouter.component.html',
  styleUrl: './maintenance-ajouter.component.css'
})
export class MaintenanceAjouterComponent implements OnInit, OnDestroy {


  // isVidangeFormInvalid: boolean = false;
  // @ViewChild('VidangeForm') vidangeForm!: NgForm;

  // -----------------------------------------------------------------------------------
  // nombreChangementPieceByIdentifiantMaintenance: number = 0;

  selectedAccident: boolean | undefined;
  selectedTypeMaintenance: string = '';
  currentDateFormatted: string = '';
  // modelDate1: NgbDateStruct | null = null;


  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;
  // modelDate2: NgbDateStruct | null = null;

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

  // ----------------------------------------------------------------
  // selectedMatricule: string = "";
  control = new FormControl('');
  filteredDotationVehicules: Observable<DotationVehicule[]> | undefined;

  // -----------------------------------------------------------------------

  // public condition: Boolean = true;

  public accidents: Accident[] = [];
  public accident: Accident = new Accident();

  public vidanges: Vidange[] = [];
  public vidange: Vidange = new Vidange();

  public reparations: Reparation[] = [];
  public reparation: Reparation = new Reparation();

  public changementPieces: ChangementPiece[] = [];
  public changementPiece: ChangementPiece = new ChangementPiece();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public maintenances: Maintenance[] = [];
  public maintenance: Maintenance = new Maintenance();

  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  private subscriptions: Subscription[] = [];

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<MaintenanceAjouterComponent>,
    private reparationService: ReparationService,
    private accidentService: AccidentService,
    private vidangeService: VidangeService,
    private dotationVehiculeService: DotationVehiculeService,
    private maintenanceService: MaintenanceService,
    private changementPieceService: ChangementPieceService,
    private bonSortieService: BonSortieService,
    private notificationService: NotificationService,
    private myDateService: MyDateService,
  ) { }

  private sendNotification(type: NotificationType, message: string, titre?: string): void {
    if (message) {
      this.notificationService.showAlert(type, message, titre);
    } else {
      this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
    }
  }

  ngOnInit(): void {

    // En utilisant !!, nous convertissons la valeur de VidangeForm.invalid en un booléen, en tenant compte de sa nullabilité.
    // this.isVidangeFormInvalid = !!this.vidangeForm.invalid;

    this.currentDateFormatted = this.myDateStringFormatter(new Date().toString());

    this.listeDotationVehicules();
    this.listeChangementPieces();
    

    this.filteredDotationVehicules = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------
  private _filter(value: string): DotationVehicule[] {

    if (value == "") {
      this.dotationVehicule = new DotationVehicule();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let dotationVehiculeTrouve = this.dotationVehicules.find(dotationVehicule => this._normalizeValue(dotationVehicule.numeroSerie.numeroSerie) === value.toLocaleLowerCase());
    if (dotationVehiculeTrouve) {
      this.dotationVehicule = dotationVehiculeTrouve;
      this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)
    } else {
      this.dotationVehicule = new DotationVehicule();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listeDotationVehicules = this.dotationVehicules.filter(dotationVehicule => this._normalizeValue(dotationVehicule.numeroSerie.numeroSerie).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet 
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeDotationVehicules;
  }

  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedNumeroSerie = event.option.value;
    this.dotationVehicule = this.dotationVehicules.find(dotationVehicule => dotationVehicule.numeroSerie.numeroSerie === selectedNumeroSerie) ?? new DotationVehicule();
  }

  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------


  // Fonction déclenchée lorsqu'une nouvelle option est sélectionnée
  onTypeMaintenanceChange(value: string) {

    // reinitialiser les options 
    this.selectedAccident = undefined;

    this.selectedTypeMaintenance = value;
  }

  // onTypeAccident(event: any) {
  //   if (this.selectedAccident) {
  //     console.log("OUI a été sélectionné. Traitement spécifique pour OUI.");
  //     // Vous pouvez ajouter ici tout traitement supplémentaire spécifique pour "OUI"
  //   } else {
  //     console.log("NON a été sélectionné. Traitement spécifique pour NON.");
  //     // Vous pouvez ajouter ici tout traitement supplémentaire spécifique pour "NON"
  //   }
  // }

  // formatCurrentDate() {
  //   const currentDate = new Date();
  //   // this.currentDateFormatted = formatDate(currentDate, 'dd MMMM yyyy', 'fr-FR');
  //   this.currentDateFormatted = this.myDateService.formatterMyDateFromString(currentDate.toString());
  // }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererBonsortieById(idIdentifiantBonSortie: string): void {

    this.subscriptions.push(this.bonSortieService.recupererBonSortieById(idIdentifiantBonSortie).subscribe({
      next: (response: BonSortie) => {
        this.bonSortie = response;
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------



  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeDotationVehicules(): void {

    const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
      next: (response: DotationVehicule[]) => {
        this.dotationVehicules = response;
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
  public listeChangementPieces(): void {

    const subscription = this.changementPieceService.listeChangementPieces().subscribe({
      next: (response: ChangementPiece[]) => {
        this.changementPieces = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // nombreChangementPiece(bonPour: BonPour, articleBonPours: ArticleBonPour[]): number {
  //   return articleBonPours.reduce((count, article) => {
  //     if (bonPour && article.identifiantBonPour && bonPour.identifiantBonPour === article.identifiantBonPour) {
  //       return count + 1;
  //     }
  //     return count;
  //   }, 1);
  // }


  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('maintenance-form');
    this.clickButton('vidange-form');
    this.clickButton('reparation-form');
    this.clickButton('changement-piece-form');
    this.clickButton('accident-form');
  }

  public ajouterVidange(VidangeForm: NgForm): void {
    this.vidange.identifiantMaintenance = ''; // à compléter
    this.vidange.libelleHuile = VidangeForm.value.libelleHuile;
    this.vidange.quantiteMiseVehicule = VidangeForm.value.quantiteMiseVehicule;
  }

  public ajouterReparation(ReparationForm: NgForm): void {
    this.reparation.identifiantMaintenance = ''; // à compléter
    this.reparation.natureReparation = ReparationForm.value.natureReparation;
    this.reparation.suiteAccident = ReparationForm.value.suiteAccident;
  }


  public ajouterChangementPiece(ChangementPieceForm: NgForm): void {
    this.changementPiece.identifiantMaintenance = ''; // à compléter
    this.changementPiece.codeChangementPiece = 0; // à compléter
    this.changementPiece.nombrePiecesRechangees = ChangementPieceForm.value.nombrePiecesRechangees;
    this.changementPiece.referencePieces = ChangementPieceForm.value.referencePieces;
  }


  public ajouterAccident(AccidentForm: NgForm): void {
    this.accident.identifiantMaintenance = ''; // à compléter
    this.accident.dateIncident = AccidentForm.value.dateIncident;
    this.accident.lieuIncident = AccidentForm.value.lieuIncident;
    this.accident.commentaireIncident = AccidentForm.value.commentaireIncident;
    this.accident.nombreDeces = AccidentForm.value.nombreDeces;
    this.accident.nombreBlesse = AccidentForm.value.nombreBlesse;
  }


  // Méthode pour ajouter un maintenance
  public ajouterMaintenance(MaintenanceForm: NgForm): void {

    // this.condition = true;
    this.maintenance = new Maintenance();

    if (this.dotationVehicule.numeroSerie.numeroSerie == '') {
      // this.condition = false;
      this.sendNotification(NotificationType.ERROR, `Ce vehicule n'existe pas`);
      return;
    }

    this.maintenance.numeroSerie = this.dotationVehicule.numeroSerie;
    this.maintenance.dateDebutMaintenance = null;
    this.maintenance.dateFinMaintenance = null;
    this.maintenance.observationMaintenance = MaintenanceForm.value.observationMaintenance;
    this.maintenance.typeMaintenance = MaintenanceForm.value.typeMaintenance;



    switch (this.maintenance.typeMaintenance.toLowerCase()) {

      case 'controle':
        // console.log(this.maintenance);
        this.validerMaintenanceControle(this.maintenance);
        break;

      case 'vidange':
        // console.log(this.maintenance);
        // console.log(this.vidange);
        this.validerMaintenanceVidange(this.maintenance);
        break;

      case 'reparation':
        // console.log(this.maintenance);
        // console.log(this.reparation);
        // console.log(this.changementPiece);
        // console.log(this.accident);
        this.validerMaintenanceReparation(this.maintenance);
        break;

      default:
        break;
    }

  }



  public validerMaintenanceControle(maintenance: Maintenance): void {

    this.subscriptions.push(this.maintenanceService.ajouterMaintenance(maintenance).subscribe({
      next: () => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussi du controle`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  public validerMaintenanceVidange(maintenance: Maintenance): void {

    this.subscriptions.push(this.maintenanceService.ajouterMaintenance(maintenance).subscribe({
      next: (response: Maintenance) => {
        this.maintenance = response;
        this.validerVidange(this.vidange, this.maintenance);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }

  public validerVidange(vidange: Vidange, maintenance: Maintenance): void {

    vidange.identifiantMaintenance = maintenance.identifiantMaintenance;

    this.subscriptions.push(this.vidangeService.ajouterVidange(vidange).subscribe({
      next: () => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de la vidange`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  public validerMaintenanceReparation(maintenance: Maintenance): void {

    this.subscriptions.push(this.maintenanceService.ajouterMaintenance(maintenance).subscribe({
      next: (response: Maintenance) => {
        this.maintenance = response;        

        this.validerReparation(this.reparation, this.maintenance);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }



  public validerReparation(reparation: Reparation, maintenance: Maintenance): void {

    reparation.identifiantMaintenance = maintenance.identifiantMaintenance;

    this.subscriptions.push(this.reparationService.ajouterReparation(reparation).subscribe({
      next: (response: Reparation) => {
        this.reparation = response;

        this.recupererChangementPieceByIdentifiantMaintenance(this.changementPiece, maintenance, this.reparation);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  public validerChangementPiece(changementPiece: ChangementPiece, maintenance: Maintenance, reparation: Reparation, nombreChangementPiece: number): void {

    changementPiece.identifiantMaintenance = maintenance.identifiantMaintenance;
    changementPiece.codeChangementPiece = nombreChangementPiece + 1;

    this.subscriptions.push(this.changementPieceService.ajouterChangementPiece(changementPiece).subscribe({
      next: () => {

        if (reparation.suiteAccident) {
          this.validerAccident(this.accident, maintenance);
        } else {
          this.popupFermer();
          this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de la réparation`);
        }

      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }

  public validerAccident(accident: Accident, maintenance: Maintenance): void {

    accident.identifiantMaintenance = maintenance.identifiantMaintenance;

    const formattedDate = this.accidentService.formatterMyDate(accident.dateIncident);

    if (formattedDate) {
      accident.dateIncident = formattedDate;
    }

    this.subscriptions.push(this.accidentService.ajouterAccident(accident).subscribe({
      next: () => {
        this.popupFermer();
        this.sendNotification(NotificationType.SUCCESS, `Ajout réussi de la réparation`);
      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  public recupererChangementPieceByIdentifiantMaintenance(changementPiece: ChangementPiece, maintenance: Maintenance, reparation: Reparation): void {

    this.subscriptions.push(this.changementPieceService.recupererChangementPieceByIdentifiantMaintenance(maintenance.identifiantMaintenance).subscribe({
      next: (response: ChangementPiece[]) => {

        // this.nombreChangementPieceByIdentifiantMaintenance = response.length + 1;
        const nombreChangementPiece = response.length;

        this.validerChangementPiece(changementPiece, maintenance, reparation, nombreChangementPiece);
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }

  myDateStringFormatter(date: MyDate | string | undefined | null): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }



  // vehiculesNonDotes(vehicules: Vehicule[], dotations: DotationVehicule[]): Vehicule[] {

  //   const vehiculesNonDotes: Vehicule[] = [];

  //   for (const vehicule of vehicules) {
  //     // Vérifier si le numéro de série du véhicule n'est pas dans la liste des dotations
  //     const estDote = dotations.some(dotation => dotation.numeroSerie.numeroSerie === vehicule.numeroSerie);

  //     // Si le véhicule n'est pas doté, l'ajouter à la liste des véhicules non dotés
  //     if (!estDote) {
  //       vehiculesNonDotes.push(vehicule);
  //     }
  //   }

  //   return vehiculesNonDotes;
  // }


  // vehiculesNonDotes(vehicules: Vehicule[], dotations: DotationVehicule[]): Vehicule[] {
  //   // Filtrer les véhicules qui ne sont pas dotés
  //   const vehiculesNonDotes = vehicules.filter(vehicule =>
  //     !dotations.some(dotation => dotation.numeroSerie.numeroSerie === vehicule.numeroSerie)
  //   );

  //   return vehiculesNonDotes;
  // }

}
