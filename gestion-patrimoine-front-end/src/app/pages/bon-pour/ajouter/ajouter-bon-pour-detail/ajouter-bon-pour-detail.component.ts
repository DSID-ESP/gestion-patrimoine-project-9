import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { FonctionUtilisateurService } from 'src/app/services/fonction-utilisateur.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Component({
  selector: 'app-ajouter-bon-pour-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './ajouter-bon-pour-detail.component.html',
  styleUrl: './ajouter-bon-pour-detail.component.css'
})
export class AjouterBonPourDetailComponent implements OnInit, OnDestroy {

  

  private subscriptions: Subscription[] = [];


  constructor(
    public dialogRef: MatDialogRef<AjouterBonPourDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public articleBonPour: ArticleBonPour,
    private fonctionUtilisateurService: FonctionUtilisateurService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  popupFermer(): void {
    this.dialogRef.close();
  }

}
