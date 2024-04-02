import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Subscription } from 'rxjs';
import { Prestataires } from 'src/app/model/prestataires.model';


@Component({
  selector: 'app-popup-secteur-activite',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './popup-secteur-activite.component.html',
  styleUrl: './popup-secteur-activite.component.css'
})
export class PopupSecteurActiviteComponent implements OnInit, OnDestroy {

  checkArray: FormArray | undefined;
  public secteurActiviteForm!: FormGroup;

  public secteurActivitesSelect: SecteurActivite[] = [];
  public secteurActivitesSelected: SecteurActivite[] = [];
  public secteurActivitesSelectedBefore: SecteurActivite[] = [];

  public secteurActivites: SecteurActivite[] = [];
  public secteurActivite: SecteurActivite = new SecteurActivite();

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();


  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopupSecteurActiviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { secteurActivites: SecteurActivite[], prestataire: Prestataires, secteurActivitesSelected: SecteurActivite[] },
    private matDialog: MatDialog,
    private fb: FormBuilder,
  ) {

  }




  ngOnInit(): void {
    this.secteurActivites = this.data.secteurActivites;
    this.prestataire = this.data.prestataire;
    this.secteurActivitesSelectedBefore = this.secteurActivitesSelected = this.data.secteurActivitesSelected;
    console.log(this.secteurActivitesSelectedBefore);
    

    if (this.secteurActivitesSelected && this.secteurActivitesSelected.length > 0) {
      // If secteurActivitesSelected is not empty, initialize checkArray with its values
      this.checkArray = this.fb.array(this.secteurActivitesSelected.map(secteur => new FormControl(secteur)));
    } else {
      // If secteurActivitesSelected is empty, initialize an empty FormArray
      this.checkArray = this.fb.array([]);
    }
  
    this.secteurActiviteForm = this.fb.group({
      checkArray: this.checkArray,
    });

    this.secteurActivitesSelect = this.checkArray.value;

    
  }


  validerSecteurActivites(): void {
    this.popupFermer()
  }

  retourner(): void {
    this.secteurActivitesSelect = this.secteurActivitesSelectedBefore;
    // console.log(this.secteurActivitesSelect);
    
    this.popupFermer();
  }


  // isChecked(secteurActivite: SecteurActivite): boolean {
  //   // Implémentez la logique pour déterminer si la case à cocher doit être cochée
  //   // Par exemple, retournez true si secteurActivite est sélectionné, sinon false
  //   // À adapter selon votre logique métier

  //   if (this.checkArray && this.checkArray.controls.length > 0) {
  //     // Utilisez some pour vérifier si secteurActivite existe dans le FormArray
  //     return this.checkArray.controls.some(control => control.value === secteurActivite);
  //   }
  //   // Si le FormArray est undefined ou vide, retournez false
  //   return false;
  // }

  // isChecked(secteurActivite: SecteurActivite, secteurActivitesSelected: SecteurActivite[]): boolean {
  //   if (this.checkArray && this.checkArray.controls.length > 0) {
  //       // Utilisez some pour vérifier si secteurActivite existe dans le FormArray
  //       return this.checkArray.controls.some(control => control.value === secteurActivite);
  //   } 

  //   // Vérifie si secteurActivite existe dans la liste secteurActivitesSelected
  //   if (secteurActivitesSelected) {
  //     return secteurActivitesSelected.some(selected => {
  //         // Comparaison des identifiants uniques, à adapter selon votre modèle
  //         return selected.libelleSecteurActivite === secteurActivite.libelleSecteurActivite;
  //     });
 
  //   } else {
  //     return false;
  //   }
    
  // }

  isChecked(secteurActivite: SecteurActivite, secteurActivitesSelected: SecteurActivite[]): boolean {
    // Vérifie si secteurActivite existe dans le FormArray
    // if (this.checkArray && this.checkArray.controls.length > 0) {
    //     const isAlreadyChecked = this.checkArray.controls.some(control => control.value === secteurActivite);
    //     if (isAlreadyChecked) {
    //         return true;
    //     }
    // }

    // Vérifie si secteurActivite existe dans la liste secteurActivitesSelected
    if (secteurActivitesSelected && secteurActivitesSelected.length > 0) {
        return secteurActivitesSelected.some(selected => {
            // Comparaison des identifiants uniques, à adapter selon votre modèle
            return selected.libelleSecteurActivite === secteurActivite.libelleSecteurActivite;
        });
    }

    return false;
  }






  onCheckboxChange(event: any, secteurActivite: SecteurActivite) {
    this.checkArray = this.secteurActiviteForm.get('checkArray') as FormArray;

    if (event.target.checked) {
      if (this.checkArray) {
        this.checkArray.push(new FormControl(secteurActivite));
        // console.log(this.checkArray.value);
      }
    } else {
      const index = this.checkArray.controls.findIndex(x => x.value === secteurActivite);
      this.checkArray.removeAt(index);
      // console.log(this.checkArray.value);
    }

    this.secteurActivitesSelect = this.checkArray.value;
    // console.log(this.secteurActivitesSelect);
  }





  popupFermer(): void {
    this.dialogRef.close();
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}