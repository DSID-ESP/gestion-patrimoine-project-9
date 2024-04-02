import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonEntree } from 'src/app/model/bon-entree.model';
import { Pays } from 'src/app/model/pays.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeObjet } from 'src/app/model/type-objet.model';
import { Vehicule } from 'src/app/model/vehicule.model';
import { MarqueVehicule } from 'src/app/model/marque-vehicule.model';
import { TypeVehicule } from 'src/app/model/type-vehicule.model';
import { ArticleBonEntree } from 'src/app/model/article-bon-entree.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleBonEntreeService } from 'src/app/services/article-bon-entree.service';
import { Agent } from 'src/app/model/agent.model';
import { BonEntreeService } from 'src/app/services/bon-entree.service';
import { TypeObjetService } from 'src/app/services/type-objet.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-article-bon-entree-ajouter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './article-bon-entree-ajouter.component.html',
  styleUrl: './article-bon-entree-ajouter.component.css'
})
export class ArticleBonEntreeAjouterComponent implements OnInit, OnDestroy {


  public bonEntrees: BonEntree[] = [];
  public bonEntree: BonEntree = new BonEntree();


  public typeObjets: TypeObjet[] = [];
  public typeObjet: TypeObjet = new TypeObjet();

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public articleBonEntrees: ArticleBonEntree[] = [];
  public articleBonEntree: ArticleBonEntree = new ArticleBonEntree();



  private subscriptions: Subscription[] = [];

  constructor(
    private bonEntreeService: BonEntreeService,
    private typeObjetService: TypeObjetService,
    private agentService: AgentService,
    private articleBonEntreeService: ArticleBonEntreeService,
    private matDialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: string,
    // private matDialog: MatDialog

  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.listeBonEntrees();
    this.listeTypeObjets();
    this.listeAgents();
  }

  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeBonEntrees(): void {

    const subscription = this.bonEntreeService.listeBonEntrees().subscribe({
      next: (response: BonEntree[]) => {
        this.bonEntrees = response;
        // console.log(this.bonEntrees);
        
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
  public listeTypeObjets(): void {

    const subscription = this.typeObjetService.listeTypeObjets().subscribe({
      next: (response: TypeObjet[]) => {
        this.typeObjets = response;
        // console.log(this.typeObjets);
        
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
  public listeAgents(): void {

    const subscription = this.agentService.listeAgents().subscribe({
      next: (response: Agent[]) => {
        this.agents = response;
        // console.log(this.agents);
        
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
  public submitArticleBonEntreeForm(): void { 
    this.clickButton('article-bon-entree-form')
  }

  public ajouterArticleBonEntree(ArticleBonEntreeForm: NgForm): void {

    // -------------------------------------------------------------------------- METHODE 1
    // const formData = this.articleBonEntreeService.createArticleBonEntreeFormData(ArticleBonEntreeForm.value);

    // this.subscriptions.push(this.articleBonEntreeService.ajouterArticleBonEntree(formData).subscribe({
    //     next: (response: ArticleBonEntree) => {
    //       console.log(response);
          
    //     },
    //     error: (errorResponse: HttpErrorResponse) => {

    //     }
    //   })
    // );

    // -------------------------------------------------------------------------- METHODE 2
    
    // BON ENTREE
    ArticleBonEntreeForm.value.identifiantBE = this.bonEntrees[0];

    // TYPE OBJET
    ArticleBonEntreeForm.value.codeTypeObjet = this.typeObjets[0];

    // AGENT
    ArticleBonEntreeForm.value.matriculeAgent = this.agents[0];

    console.log(ArticleBonEntreeForm.value);
    
    this.articleBonEntree = ArticleBonEntreeForm.value;
    
    this.subscriptions.push(this.articleBonEntreeService.ajouterArticleBonEntree(ArticleBonEntreeForm.value).subscribe({
        next: (response: ArticleBonEntree) => {
          console.log(response);
          
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      })
    );
  }
  // ----------------------------------------------------------------------------------




}
