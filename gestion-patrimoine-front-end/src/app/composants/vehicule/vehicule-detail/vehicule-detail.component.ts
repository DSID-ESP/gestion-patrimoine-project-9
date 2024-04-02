import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicule } from 'src/app/model/vehicule.model';
import { MyDateService } from 'src/app/services/my-date.service';
import { MyDate } from 'src/app/model/my-date.model';

@Component({
  selector: 'app-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './vehicule-detail.component.html',
  styleUrl: './vehicule-detail.component.css'
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public vehicule: Vehicule,
    private myDateService: MyDateService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  myDateStringFormatter(date: MyDate | string | undefined): string {
    if (!date) {
      return '';
    }
  
    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

}
