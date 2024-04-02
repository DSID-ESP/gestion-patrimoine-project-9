import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeVehicule } from 'src/app/model/type-vehicule.model';
import { MarqueVehicule } from 'src/app/model/marque-vehicule.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { Pays } from 'src/app/model/pays.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TypeEnergie } from 'src/app/model/type-energie.model';
import { TypeVehiculeService } from 'src/app/services/type-vehicule.service';
import { TypeEnergieService } from 'src/app/services/type-energie.service';
import { MarqueVehiculeService } from 'src/app/services/marque-vehicule.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { MyDate } from 'src/app/model/my-date.model';
import { PaysService } from 'src/app/services/pays.service';

@Component({
  selector: 'app-vehicule-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './vehicule-ajouter.component.html',
  styleUrl: './vehicule-ajouter.component.css'
})
export class VehiculeAjouterComponent {

  public typeVehicules: TypeVehicule[] = [];
  public typeVehicule: TypeVehicule = new TypeVehicule();

  public typeEnergies: TypeEnergie[] = [];
  public typeEnergie: TypeEnergie = new TypeEnergie();


  public marqueVehicules: MarqueVehicule[] = [];
  public marqueVehicule: MarqueVehicule = new MarqueVehicule();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere = new UniteDouaniere();

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree = new ArticleBonEntree();

  public pays: Pays[] = [];
  public LePays: Pays = new Pays();

  


  private subscriptions: Subscription[] = [];

  constructor(

    private vehiculeService: VehiculeService,
    private typeVehiculeService: TypeVehiculeService,
    private typeEnergieService: TypeEnergieService,
    private marqueVehiculeService: MarqueVehiculeService,
    private uniteDouaniereService: UniteDouaniereService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private paysService: PaysService,
    private matDialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: string,
    // private matDialog: MatDialog

  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.listeTypeVehiculeServices();
    this.listeTypeEnergieServices();
    this.listeMarqueVehiculeServices();
    this.listeUniteDouaniereServices();
    this.listeArticleBonEntreeServices();
    this.listePaysServices();

  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  public listeTypeVehiculeServices(): void {

    const subscription = this.typeVehiculeService.listeTypeVehicules().subscribe({
      next: (response: TypeVehicule[]) => {
        this.typeVehicules = response;
        // console.log(this.typeVehicules);
        
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
  public listeTypeEnergieServices(): void {

    const subscription = this.typeEnergieService.listeTypeEnergies().subscribe({
      next: (response: TypeEnergie[]) => {
        this.typeEnergies = response;
        // console.log(this.typeEnergies);
        
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
  public listeMarqueVehiculeServices(): void {

    const subscription = this.marqueVehiculeService.listeMarqueVehicules().subscribe({
      next: (response: MarqueVehicule[]) => {
        this.marqueVehicules = response;
        // console.log(this.marqueVehicules);
        
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
  public listeUniteDouaniereServices(): void {

    const subscription = this.uniteDouaniereService.listeUniteDouanieres().subscribe({
      next: (response: UniteDouaniere[]) => {
        this.uniteDouanieres = response;
        // console.log(this.uniteDouanieres);
        
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
  public listeArticleBonEntreeServices(): void {

    const subscription = this.articleBonEntreeService.listeArticleBonEntrees().subscribe({
      next: (response: ArticleBonEntree[]) => {
        this.articleBonEntrees = response;
        // console.log(this.articleBonEntrees);
        
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
  public listePaysServices(): void {

    const subscription = this.paysService.listePays().subscribe({
      next: (response: Pays[]) => {
        this.pays = response;
        // console.log(this.pays);
        
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

  // pour executer ajouterBonEntree
  public submitBonEntreeForm(): void { 
    this.clickButton('vehicule-form')
  }

  public ajouterVehicule(VehiculeForm: NgForm): void {

    const dateBL: MyDate = VehiculeForm.value.dateMiseEnCirculation;
    const formattedDate = this.vehiculeService.formatterMyDate(dateBL);

    // const bordereauLivraisonForm1: NgForm = bordereauLivraisonForm;
    // bordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // bordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);
    

    if (formattedDate) {
      VehiculeForm.value.dateMiseEnCirculation = formattedDate;
    }
    
    // TYPE VEHICULE SERVICE
    VehiculeForm.value.codeTypeEnergie = this.typeVehicules[0];

    // TYPE ENERGIE SERVICE
    VehiculeForm.value.codeTypeEnergie = this.typeEnergies[0];


    // MARQUE VEHICULE SERVICE
    VehiculeForm.value.codeMarque = this.marqueVehicules[0];

    // UNITE DOUANIERE SERVICE
    VehiculeForm.value.codeUniteDouaniere = this.uniteDouanieres[0];

    // ARTICLE BON ENTREE SERVICE
    VehiculeForm.value.identifiantBE = this.articleBonEntrees[0];



    console.log(VehiculeForm.value);
    
    
    this.subscriptions.push(this.vehiculeService.ajouterVehicule(VehiculeForm.value).subscribe({
        next: (response: Vehicule) => {
          console.log(response);
          
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }
  // --------------------------------------------------------------------------


}
