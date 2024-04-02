import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { Subscription } from 'rxjs';
import { BordereauLivraison } from 'src/app/model/bordereau-livraison.model';
import { Sections } from 'src/app/model/sections.model';
import { Agent } from 'src/app/model/agent.model';
import { SectionsService } from 'src/app/services/sections.service';
import { BordereauLivraisonService } from 'src/app/services/bordereau-livraison.service';
import { AgentService } from 'src/app/services/agent.service';
import { Prestataires } from 'src/app/model/prestataires.model';
import { PrestatairesService } from 'src/app/services/prestataires.service';
import { MyDate } from 'src/app/model/my-date.model';

@Component({
  selector: 'app-bordereau-livraison-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './bordereau-livraison-ajouter.component.html',
  styleUrl: './bordereau-livraison-ajouter.component.css'
})
export class BordereauLivraisonAjouterComponent implements OnInit, OnDestroy {

  

  public prestataires: Prestataires[] = [];
  public prestataire: Prestataires = new Prestataires();

  public sections: Sections[] = [];
  public section: Sections = new Sections();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public bordereauLivraisons: BordereauLivraison[] = [];
  public bordereauLivraison: BordereauLivraison = new BordereauLivraison();

  selectedValueConformiteBL: string = 'OUI';


  private subscriptions: Subscription[] = [];

  constructor(
    private prestatairesService: PrestatairesService,
    private bordereauLivraisonService: BordereauLivraisonService,
    private sectionsService: SectionsService,
    private agentService: AgentService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listePrestataires();
    this.listeAgent();
    this.listeSections();
  }



  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listePrestataires(): void {

    const subscription = this.prestatairesService.listePrestataires().subscribe({
      next: (response: Prestataires[]) => {
        this.prestataires = response;
        // console.log(this.prestataires);
        
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
  public listeSections(): void {

    const subscription = this.sectionsService.listeSections().subscribe({
      next: (response: Sections[]) => {
        this.sections = response;
        // console.log(this.prestataires);
        
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
  public listeAgent(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.prestataires);
        
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

  // pour executer ajouterBordereauLivraison
  public submitBordereauLivraisonForm(): void { 
    this.clickButton('bordereau-livraison-form')
  }

  public ajouterBordereauLivraison(BordereauLivraisonForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.bordereauLivraisonService.createBordereauLivraisonFormData(BordereauLivraisonForm.value);

    // this.subscriptions.push(this.bordereauLivraisonService.ajouterBordereauLivraisonRequestParam(formData).subscribe({
    //     next: (response: BordereauLivraison) => {
    //       console.log(response);
          
    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2
    const dateBL: MyDate = BordereauLivraisonForm.value.dateBL;
    const formattedDate = this.bordereauLivraisonService.formatterMyDate(dateBL);

    // const bordereauLivraisonForm1: NgForm = BordereauLivraisonForm;
    // BordereauLivraisonForm.control.get('dateBL')?.patchValue(formattedDate);
    // BordereauLivraisonForm.control.get('dateBL')?.setValue(formattedDate);
    

    if (formattedDate) {
      BordereauLivraisonForm.value.dateBL = formattedDate;
    }
    
    // SECTION ET AGENT
    BordereauLivraisonForm.value.codeSection = this.sections[0];
    BordereauLivraisonForm.value.matriculeAgent = this.agents[0];

    // CONFORMITE BORDEREAU LIVRAISON
    // BordereauLivraisonForm.value.conformiteBL = 'oui';

    // console.log(bordereauLivraisonForm.value);
    
    
    this.subscriptions.push(this.bordereauLivraisonService.ajouterBordereauLivraison(BordereauLivraisonForm.value).subscribe({
        next: (response: BordereauLivraison) => {
          this.bordereauLivraison = response;
          console.log(this.bordereauLivraison);
          
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );

  }

  // --------------------------------------------------------------------------

}