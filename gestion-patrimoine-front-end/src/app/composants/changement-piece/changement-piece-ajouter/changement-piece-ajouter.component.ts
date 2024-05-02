import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { ChangementPiece } from 'src/app/model/changement-piece';
import { Piece } from 'src/app/model/piece';
import { ChangementPieceService } from 'src/app/services/changement-piece.service';
import { PieceService } from 'src/app/services/piece.service';

@Component({
  selector: 'app-changement-piece-ajouter',
  // standalone: true,
  // imports: [],
  templateUrl: './changement-piece-ajouter.component.html',
  styleUrl: './changement-piece-ajouter.component.css'
})
export class ChangementPieceAjouterComponent implements OnInit, OnDestroy {


  // public piecesSelect: Piece[] = [];
  public pieces: Piece[] = [];
  public piece: Piece = new Piece();


  public changementPieces: ChangementPiece[] = [];
  public changementPiece: ChangementPiece = new ChangementPiece();

  // ------------------------------------------------------------------------

  filteredPieces: Observable<Piece[]> | undefined;
  
  controlPiece = new FormControl('');

  // ------------------------------------------------------------------------
  
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChangementPieceAjouterComponent>,
    private changementPieceService: ChangementPieceService,
    private pieceService: PieceService,
    // private notificationService: NotificationService,
    private matDialog: MatDialog,
  ) {}

  // private sendNotification(type: NotificationType, message: string, titre?: string): void {
  //   if (message) {
  //     this.notificationService.showAlert(type, message, titre);
  //   } else {
  //     this.notificationService.showAlert(type, 'Une erreur s\'est produite. Veuillez réessayer.', titre);
  //   }
  // }


  ngOnInit(): void {
    this.listePieces();
    
    this.filteredPieces = this.controlPiece.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPiece(value || '')),
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  

  private _filterPiece(value: string): Piece[] {

    if (value == "") {
      this.piece = new Piece();
    }

    // Trouver le vehicule ayant exactement le même numeroSerie que la valeur donnée
    let pieceTrouve = this.pieces.find(piece => this._normalizeValue(piece.referencePiece) === value.toLocaleLowerCase());
    if (pieceTrouve) {
      this.piece = pieceTrouve;
      // this.recupererBonsortieById(this.dotationVehicule.codeArticleBonSortie.identifiantBonSortie)
    } else {
      this.piece = new Piece();
    }

    // la liste des vehicules trouvé ou vehicule trouvé en fonction du mot a rechercher
    let listePieces = this.pieces.filter(piece => this._normalizeValue(piece.referencePiece).includes(value.toLocaleLowerCase()));
    // Trouver l'agent automatique au premier indice sans avoir saisie le matricule au complet
    // if (listeAgents.length == 1) {
    //   this.agent = this.agents.find(agent => agent.matriculeAgent === listeAgents[0].matriculeAgent) ?? new Agent();
    // }
    return listePieces;
  }


  private _normalizeValue(value: string): string {
    return value.toLocaleLowerCase().replace(/\s/g, '');
  }


  popupFermer(): void {
    this.dialogRef.close();
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listePieces(): void {

    const subscription = this.pieceService.listePieces().subscribe({
      next: (response: Piece[]) => {
        this.pieces = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------


  // --------------------------------------------------------------------------
  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {
    this.clickButton('changement-piece-form');
  }


  // --------------------------------------------------------------------------

  public ajouterChangementPiece(ChangementPieceForm: NgForm): void {
    this.changementPiece.identifiantMaintenance = ''; // à compléter
    this.changementPiece.codeChangementPiece = 0; // à compléter
    this.changementPiece.nombrePieces = ChangementPieceForm.value.nombrePieces;
    this.changementPiece.identifiantPiece = this.piece;

    this.popupFermer();
  }

  onOptionSelectedPiece(event: MatAutocompleteSelectedEvent) {
    const selectedReferencePiece = event.option.value;
    this.piece = this.pieces.find(piece => piece.referencePiece == selectedReferencePiece) ?? new Piece();
  }

  // --------------------------------------------------------------------------



}
