import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { Prestataires } from 'src/app/model/prestataires.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-secteur-activite-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './secteur-activite-detail.component.html',
  styleUrl: './secteur-activite-detail.component.css'
})
export class SecteurActiviteDetailComponent implements OnInit, OnDestroy {

  public secteurActivites: SecteurActivite[] = [];
  public secteurActivite: SecteurActivite = new SecteurActivite();

  private subscriptions: Subscription[] = [];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public prestataire: Prestataires,
  ) { }

  ngOnInit(): void {
    this.secteurActivites = this.prestataire.secteurActivite;
  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
