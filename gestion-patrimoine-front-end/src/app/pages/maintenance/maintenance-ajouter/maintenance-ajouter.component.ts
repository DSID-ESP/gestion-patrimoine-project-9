import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { NatureReparation } from 'src/app/enum/nature-reparation.enum';
import { EtatMaintenance } from 'src/app/enum/etat-maintenance.enum';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { Huile } from 'src/app/model/huile';
import { Piece } from 'src/app/model/piece';
import { HuileService } from 'src/app/services/huile.service';
import { PieceService } from 'src/app/services/piece.service';
import { ChangementPieceAjouterComponent } from 'src/app/composants/changement-piece/changement-piece-ajouter/changement-piece-ajouter.component';
import { LieuStockageVehicule } from 'src/app/model/lieu-stockage-vehicule.model';
import { LieuStockageVehiculeService } from 'src/app/services/lieu-stockage-vehicule.service';

@Component({
  selector: 'app-maintenance-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './maintenance-ajouter.component.html',
  styleUrl: './maintenance-ajouter.component.css'
})
export class MaintenanceAjouterComponent implements OnInit, OnDestroy {


  // -----------------------------------------------------------------------------------
  SUITEACCIDENT: string = NatureReparation.SUITEACCIDENT;
  REPARETIONSIMPLE: string = NatureReparation.REPARETIONSIMPLE;


  // selectedAccident: boolean | undefined;
  selectedNatureReparation: string = NatureReparation.REPARETIONSIMPLE;
  selectedTypeMaintenance: string = '';

  currentDateFormatted: string = '';


  nombreBlesse: number = 0;
  nombreDeces: number = 0;


  accidentFormInvalid: boolean = true;
  vidangeFormInvalid: boolean = true;

  // ----------------------------------------------------------------------------------
  modelDate1: NgbDateStruct | null = null;

  formatDateModelNgbDateStruct(date: NgbDateStruct | MyDate | string | null): string {
    return this.myDateService.formatDateModelNgbDateStruct(date);
  }

  formatterStringToNgbDateStruct(date: string): NgbDateStruct {
    return this.myDateService.formatterStringToNgbDateStruct(date);
  }
  // ----------------------------------------------------------------------------------

  // ----------------------------------------------------------------
  // selectedMatricule: string = "";
  controlDotationVehicule = new FormControl('');
  controlHuile = new FormControl('');
  controlLieuIncident = new FormControl('');
  // controlPiece = new FormControl('');

  filteredDotationVehicules: Observable<DotationVehicule[]> | undefined;
  filteredHuiles: Observable<Huile[]> | undefined;
  filteredLieuStockageVehicules: Observable<LieuStockageVehicule[]> | undefined;
  // filteredPieces: Observable<Piece[]> | undefined;
  // -----------------------------------------------------------------------

  // public condition: Boolean = true;

  public accidents: Accident[] = [];
  public accident: Accident = new Accident();

  public vidanges: Vidange[] = [];
  public vidange: Vidange = new Vidange();

  public huiles: Huile[] = [];
  public huile: Huile = new Huile();

  public lieuStockageVehicules: LieuStockageVehicule[] = [];
  public lieuStockageVehicule: LieuStockageVehicule = new LieuStockageVehicule();

  
  // public piecesSelect: Piece[] = [];
  public pieces: Piece[] = [];
  public piece: Piece = new Piece();

  public reparations: Reparation[] = [];
  public reparation: Reparation = new Reparation();

  public changementPiecesSelect: ChangementPiece[] = [];
  public changementPieces: ChangementPiece[] = [];
  public changementPiece: ChangementPiece = new ChangementPiece();

  // public vehicules: Vehicule[] = [];
  // public vehicule: Vehicule = new Vehicule();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  public maintenances: Maintenance[] = [];
  public maintenance: Maintenance = new Maintenance();

  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<MaintenanceAjouterComponent>,
    private reparationService: ReparationService,
    private accidentService: AccidentService,
    private vidangeService: VidangeService,
    private dotationVehiculeService: DotationVehiculeService,
    private lieuStockageVehiculeService: LieuStockageVehiculeService,
    private bonSortieService: BonSortieService,
    private maintenanceService: MaintenanceService,
    private huileService: HuileService,
    private pieceService: PieceService,
    private changementPieceService: ChangementPieceService,
    private notificationService: NotificationService,
    private myDateService: MyDateService,
    private matDialog: MatDialog,
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
    this.listeLieuStockageVehicules();
    // this.listeChangementPieces();
    // this.listePieces();
    this.listeHuiles();

    this.filteredDotationVehicules = this.controlDotationVehicule.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredHuiles = this.controlHuile.valueChanges.pipe(
      startWith(''),
      map(value => this._filterHuile(value || '')),
    );

    this.filteredLieuStockageVehicules = this.controlLieuIncident.valueChanges.pipe(
      startWith(''),
      map(value => this._filterLieuIncident(value || '')),
    );

    // this.filteredPieces = this.controlPiece.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filterPiece(value || '')),
    // );


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

  private _filterHuile(value: string): Huile[] {

    if (value == "") {
      this.huile = new Huile();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let huileTrouve = this.huiles.find(huile => this._normalizeValue(huile.libelleHuile) === value.toLocaleLowerCase());
    if (huileTrouve) {
      this.huile = huileTrouve;
      // this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)
    } else {
      this.huile = new Huile();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listeHuiles = this.huiles.filter(huile => this._normalizeValue(huile.libelleHuile).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeHuiles;
  }


  private _filterLieuIncident(value: string): LieuStockageVehicule[] {

    if (value == "") {
      this.lieuStockageVehicule = new LieuStockageVehicule();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let lieuStockageVehiculeTrouve = this.lieuStockageVehicules.find(lieuStockageVehicule => this._normalizeValue(lieuStockageVehicule.libellleLieuVH) === value.toLocaleLowerCase());
    if (lieuStockageVehiculeTrouve) {
      this.lieuStockageVehicule = lieuStockageVehiculeTrouve;
      // this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)
    } else {
      this.lieuStockageVehicule = new LieuStockageVehicule();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listeLieuStockageVehicules = this.lieuStockageVehicules.filter(lieuStockageVehicule => this._normalizeValue(lieuStockageVehicule.libellleLieuVH).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listeLieuStockageVehicules;
  }

  // private _filterPiece(value: string): Piece[] {

  //   if (value == "") {
  //     this.piece = new Piece();
  //   }

  //   // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
  //   let pieceTrouve = this.pieces.find(piece => this._normalizeValue(piece.referencePiece) === value.toLocaleLowerCase());
  //   if (pieceTrouve) {
  //     this.piece = pieceTrouve;
  //     // this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)
  //   } else {
  //     this.piece = new Piece();
  //   }

  //   // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
  //   let listePieces = this.pieces.filter(piece => this._normalizeValue(piece.referencePiece).includes(value.toLocaleLowerCase()));
  //   // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet
  //   // if (listeAgents.length == 1) {
  //   //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
  //   // }
  //   return listePieces;
  // }

  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedNumeroSerie = event.option.value;
    this.dotationVehicule = this.dotationVehicules.find(dotationVehicule => dotationVehicule.numeroSerie.numeroSerie === selectedNumeroSerie) ?? new DotationVehicule();
  }

  onOptionSelectedHuile(event: MatAutocompleteSelectedEvent) {
    const selectedLibelleHuile = event.option.value;
    this.huile = this.huiles.find(huile => huile.libelleHuile== selectedLibelleHuile) ?? new Huile();
  }

  onOptionSelectedLieu(event: MatAutocompleteSelectedEvent) {
    const selectedLibelleLieu = event.option.value;
    this.lieuStockageVehicule = this.lieuStockageVehicules.find(lieuStockageVehicule => lieuStockageVehicule.libellleLieuVH== selectedLibelleLieu) ?? new LieuStockageVehicule();
  }

  // onOptionSelectedPiece(event: MatAutocompleteSelectedEvent) {
  //   const selectedReferencePiece = event.option.value;
  //   this.piece = this.pieces.find(piece => piece.referencePiece == selectedReferencePiece) ?? new Piece();
  // }


  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------


  // Fonction déclenchée lorsqu'une nouvelle option est sélectionnée
  onTypeMaintenanceChange(value: string) {
    this.selectedTypeMaintenance = value;
  }

  onTypeReparationChange(value: string) {
    this.selectedNatureReparation = value;
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
  public listeLieuStockageVehicules(): void {

    const subscription = this.lieuStockageVehiculeService.listeLieuStockageVehicules().subscribe({
      next: (response: LieuStockageVehicule[]) => {
        this.lieuStockageVehicules = response;
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
  // public listeChangementPieces(): void {

  //   const subscription = this.changementPieceService.listeChangementPieces().subscribe({
  //     next: (response: ChangementPiece[]) => {
  //       this.changementPieces = response;
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
  // public listePieces(): void {

  //   const subscription = this.pieceService.listePieces().subscribe({
  //     next: (response: Piece[]) => {
  //       this.pieces = response;
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
  public listeHuiles(): void {

    const subscription = this.huileService.listeHuiles().subscribe({
      next: (response: Huile[]) => {
        this.huiles = response;
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

  popupAjouterPiece(): void {
    const dialogRef = this.matDialog.open(
      ChangementPieceAjouterComponent,
      {
        width: '50%',
        // height: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms'
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      if (dialogRef.componentInstance instanceof ChangementPieceAjouterComponent) {
        const changementPiece = dialogRef.componentInstance.changementPiece;
        if (changementPiece.identifiantPiece.referencePiece != "") {
          this.changementPiecesSelect.push(changementPiece);
          // console.log(this.changementPiecesSelect);
        }
        
      }
      // ----------------------------------
      // this.ngOnInit();
    });
  }


  popupFermer(): void {
    this.dialogRef.close();
  }


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    
    this.clickButton('vidange-form');
    this.clickButton('reparation-form');
    // this.clickButton('changement-piece-form');
    this.clickButton('accident-form');

    // avant de valider l'ensemble du formulaire
    // setTimeout(() => {
    //   this.clickButton('maintenance-form');
    // }, 500);

    this.clickButton('maintenance-form');
  }

  public ajouterVidange(VidangeForm: NgForm): void {

    if (!VidangeForm.invalid) {
      this.vidangeFormInvalid = false;
    }

    this.vidange.identifiantMaintenance = ''; // à compléter
    this.vidange.identifiantHuile = this.huile;
    this.vidange.quantite = VidangeForm.value.quantite;    
  }

  public ajouterReparation(ReparationForm: NgForm): void {
    this.reparation.identifiantMaintenance = ''; // à compléter
    this.reparation.natureReparation = ReparationForm.value.natureReparation;
    // this.reparation.suiteAccident = ReparationForm.value.suiteAccident;
  }


  // public ajouterChangementPiece(ChangementPieceForm: NgForm): void {
  //   this.changementPiece.identifiantMaintenance = ''; // à compléter
  //   this.changementPiece.codeChangementPiece = 0; // à compléter
  //   this.changementPiece.nombrePieces = ChangementPieceForm.value.nombrePieces;
  //   // if (this.piece) {
      
  //   // }
  //   // this.changementPiece.identifiantPiece.referencePiece = ChangementPieceForm.value.referencePiece;
  //   this.changementPiece.identifiantPiece = this.piece;
  // }


  public ajouterAccident(AccidentForm: NgForm): void {

    if (!AccidentForm.invalid) {
      this.accidentFormInvalid = false;
    }

    this.accident.identifiantMaintenance = ''; // à compléter
    this.accident.dateIncident = AccidentForm.value.dateIncident;
    // this.accident.lieuIncident = ''; // à compléter
    this.accident.lieuIncident = this.lieuStockageVehicule.libellleLieuVH;
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
      this.sendNotification(NotificationType.ERROR, `Renseigner un véhicule`);
      return;
    }

    if (this.lieuStockageVehicule.libellleLieuVH == '' && (this.selectedNatureReparation == NatureReparation.SUITEACCIDENT)) {
      // this.condition = false;
      this.sendNotification(NotificationType.ERROR, `Renseigner un lieu`);
      return;
    }

    if (this.accidentFormInvalid && (this.selectedNatureReparation == NatureReparation.SUITEACCIDENT)) {
      this.sendNotification(NotificationType.ERROR, `Velliez renseigner l'accident!`);
      return;
    }

    if ((this.vidangeFormInvalid || this.huile.identifiantHuile == "") && this.selectedTypeMaintenance.toLowerCase() == 'vidange') {
      if (this.huile.identifiantHuile == "") {
        this.sendNotification(NotificationType.ERROR, `Velliez renseigner une huile!`);
      }

      if (this.vidangeFormInvalid) {
        this.sendNotification(NotificationType.ERROR, `Velliez renseigner une quantité d'huile!`);
      }
      
      return;
    }

    


    this.maintenance.numeroSerie = this.dotationVehicule.numeroSerie;
    this.maintenance.etatMaintenance = EtatMaintenance.ENCOURS;
    this.maintenance.dateDebutMaintenance = null;
    this.maintenance.dateFinMaintenance = null;
    this.maintenance.observationMaintenance = MaintenanceForm.value.observationMaintenance;
    this.maintenance.typeMaintenance = MaintenanceForm.value.typeMaintenance;

    // console.log(this.maintenance);


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

        // this.recupererChangementPieceByIdentifiantMaintenance(this.changementPiece, maintenance, this.reparation);


        let nombreChangementPiece = 0;

        for (const changementPiece of this.changementPiecesSelect) {
          this.validerChangementPiece(changementPiece, maintenance, reparation, nombreChangementPiece);
          nombreChangementPiece++; // Incrémentation de nombreChangementPiece à chaque itération
        }

      },
      error: (errorResponse: HttpErrorResponse) => {
        // Gérer les erreurs ici
      }
    }));
  }


  public validerChangementPiece(changementPiece: ChangementPiece, maintenance: Maintenance, reparation: Reparation, nombreChangementPiece: number): void {

    changementPiece.identifiantMaintenance = maintenance.identifiantMaintenance;
    
    changementPiece.codeChangementPiece = nombreChangementPiece + 1;


    // console.log(this.accident);
    // console.log(this.maintenance);

    // console.log(reparation.natureReparation);


    this.subscriptions.push(this.changementPieceService.ajouterChangementPiece(changementPiece).subscribe({
      next: () => {

        if (reparation.natureReparation === "SUITE ACCIDENT") {
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

    console.log(accident);


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


  // public recupererChangementPieceByIdentifiantMaintenance(changementPiece: ChangementPiece, maintenance: Maintenance, reparation: Reparation): void {

  //   this.subscriptions.push(this.changementPieceService.recupererChangementPieceByIdentifiantMaintenance(maintenance.identifiantMaintenance).subscribe({
  //     next: (response: ChangementPiece[]) => {

  //       // this.nombreChangementPieceByIdentifiantMaintenance = response.length + 1;
  //       const nombreChangementPiece = response.length;

  //       this.validerChangementPiece(changementPiece, maintenance, reparation, nombreChangementPiece);
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {

  //     }
  //   }));

  // }

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

  supprimerChangementPiecesSelect(index: number) {
    this.changementPiecesSelect.splice(index, 1);
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
