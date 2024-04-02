import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Prestataires } from 'src/app/model/prestataires.model';

@Component({
  selector: 'app-prestataire-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './prestataire-detail.component.html',
  styleUrl: './prestataire-detail.component.css'
})
export class PrestataireDetailComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public prestataire: Prestataires,
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
