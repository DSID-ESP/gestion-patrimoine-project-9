import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PopupConfirmationSupprimerComponent } from 'src/app/composants/supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { Accident } from 'src/app/model/accident';
import { ChangementPiece } from 'src/app/model/changement-piece';
import { Maintenance } from 'src/app/model/maintenance';
import { MyDate } from 'src/app/model/my-date.model';
import { Reparation } from 'src/app/model/reparation';
import { Vidange } from 'src/app/model/vidange';
import { ChangementPieceService } from 'src/app/services/changement-piece.service';
import { AccidentService } from 'src/app/services/accident.service';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { ReparationService } from 'src/app/services/reparation.service';
import { VidangeService } from 'src/app/services/vidange.service';

@Component({
  selector: 'app-maintenance-detail',
  // standalone: true,
  // imports: [],
  templateUrl: './maintenance-detail.component.html',
  styleUrl: './maintenance-detail.component.css'
})
export class MaintenanceDetailComponent implements OnInit, OnDestroy  {

  public maintenances: Maintenance[] = [];
  // public maintenance: Maintenance = new Maintenance();


  public vidanges: Vidange[] = [];
  public vidange: Vidange = new Vidange();

  public reparations: Reparation[] = [];
  public reparation: Reparation = new Reparation();

  public accidents: Accident[] = [];
  public accident: Accident = new Accident();

  public changementPieces: ChangementPiece[] = [];
  public changementPiece: ChangementPiece | undefined;
  public changementPiecesByMaintenance: ChangementPiece[] = [];


  private subscriptions: Subscription[] = [];


  constructor(
    public dialogRef: MatDialogRef<MaintenanceDetailComponent>,
    private matDialog: MatDialog,
    private myDateService: MyDateService,
    private vidangeService: VidangeService,
    private reparationService: ReparationService,
    private accidentService: AccidentService,
    private changementPieceService: ChangementPieceService,
    // private maintenanceService: MaintenanceService,
    @Inject(MAT_DIALOG_DATA) public maintenance: Maintenance,
  ) {}

  ngOnInit(): void {
    // console.log(this.maintenance);
    
    this.listeChangementPieces(this.maintenance);
    this.recupererVidangeById(this.maintenance.identifiantMaintenance);
    this.recupererReparationById(this.maintenance.identifiantMaintenance);
    this.recupererAccidentById(this.maintenance.identifiantMaintenance);
    
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeChangementPieces(maintenance: Maintenance): void {

    const subscription = this.changementPieceService.listeChangementPieces().subscribe({
      next: (response: ChangementPiece[]) => {
        this.changementPieces = response;
        this.recupererChangementPiecesByMaintenanceAndChangementPiece(maintenance, response)

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
  public recupererVidangeById(identifiantMaintenance: string): void {

    this.subscriptions.push(this.vidangeService.recupererVidangeById(identifiantMaintenance).subscribe({
      next: (response: Vidange) => {
        this.vidange = response;
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererReparationById(identifiantMaintenance: string): void {

    this.subscriptions.push(this.reparationService.recupererReparationById(identifiantMaintenance).subscribe({
      next: (response: Reparation) => {
        this.reparation = response;
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


   // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererAccidentById(identifiantMaintenance: string): void {

    this.subscriptions.push(this.accidentService.recupererAccidentById(identifiantMaintenance).subscribe({
      next: (response: Accident) => {
        this.accident = response;
        // console.log(response);
        
      },
      error: (errorResponse: HttpErrorResponse) => {
        
      }
    }));

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererChangementPieceById(codeChangementPiece: number, identifiantMaintenance: string): void {

    this.subscriptions.push(this.changementPieceService.recupererChangementPieceById(codeChangementPiece, identifiantMaintenance).subscribe({
      next: (response: ChangementPiece) => {
        this.changementPiece = response;
      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    }));

  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public recupererChangementPiecesByMaintenanceAndChangementPiece(maintenance: Maintenance, changementPieces: ChangementPiece[]): void {
    // const changementPiecesFiltres: ChangementPiece[]  = changementPieces.filter(changementPiece => changementPiece.identifiantMaintenance === maintenance.identifiantMaintenance);
    this.changementPiecesByMaintenance = changementPieces.filter(changementPiece => changementPiece.identifiantMaintenance === maintenance.identifiantMaintenance);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------




  supprimerMaintenanceById(identifiantMaintenance: String): void {  

    const dialogRef = this.matDialog.open(
      PopupConfirmationSupprimerComponent,
      {
        width: '40%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          id: identifiantMaintenance,
          categorie: "maintenance",
          message: "Voulez-vous supprimer cette maintenance?"
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

  numberToString(terme: string | number): string {
    if (typeof terme === 'number') {
        return terme.toString().toLowerCase();
    }
    return terme.toLowerCase(); // assuming terme is already a string
  }

}
