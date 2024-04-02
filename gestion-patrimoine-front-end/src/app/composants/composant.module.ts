import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EnteteComponent } from './entete/entete.component';
import { MenuComponent } from './menu/menu.component';
import { PopupConfirmationSupprimerComponent } from './supprimer/popup-confirmation-supprimer/popup-confirmation-supprimer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { PrestataireDetailComponent } from './prestataire/prestataire-detail/prestataire-detail.component';
import { SecteurActiviteDetailComponent } from './secteur-activite/secteur-activite-detail/secteur-activite-detail.component';
import { PopupSecteurActiviteComponent } from './secteur-activite/popup-secteur-activite/popup-secteur-activite.component';
import { VehiculeDetailComponent } from './vehicule/vehicule-detail/vehicule-detail.component';
import { VehiculeAjouterComponent } from './vehicule/vehicule-ajouter/vehicule-ajouter.component';
import { BordereauLivraisonAjouterComponent } from './bordereau-livraison/bordereau-livraison-ajouter/bordereau-livraison-ajouter.component';
import { ArticleBonEntreeAjouterComponent } from './article-bon-entree/article-bon-entree-ajouter/article-bon-entree-ajouter.component';
import { BonEntreeDetailComponent } from './bon-entree/bon-entree-detail/bon-entree-detail.component';
import { BonEntreeAjouterComponent } from './bon-entree/bon-entree-ajouter/bon-entree-ajouter.component';
import { VehiculeAjouterDotationComponent } from './vehicule/vehicule-ajouter-dotation/vehicule-ajouter-dotation.component';


@NgModule({
  declarations: [
    // composants
    LoaderComponent,
    EnteteComponent,
    MenuComponent,
    PopupConfirmationSupprimerComponent,

    BonEntreeAjouterComponent,
    BonEntreeDetailComponent,

    ArticleBonEntreeAjouterComponent,
    // ArticleBonEntreeDetailComponent,

    BordereauLivraisonAjouterComponent,
    // BordereauLivraisonDetailComponent,

    VehiculeAjouterComponent,
    VehiculeDetailComponent,
    VehiculeAjouterDotationComponent,

    PrestataireDetailComponent,

    SecteurActiviteDetailComponent,

    PopupSecteurActiviteComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule, // dropdown

    MatExpansionModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    
    AppRoutingModule  
  ],
  exports: [
    // composants
    LoaderComponent,
    EnteteComponent,
    MenuComponent,
    PopupConfirmationSupprimerComponent,

    BonEntreeAjouterComponent,
    BonEntreeDetailComponent,

    ArticleBonEntreeAjouterComponent,
    // ArticleBonEntreeDetailComponent,

    BordereauLivraisonAjouterComponent,
    // BordereauLivraisonDetailComponent,

    VehiculeAjouterComponent,
    VehiculeDetailComponent,
    VehiculeAjouterDotationComponent,

    PrestataireDetailComponent,

    SecteurActiviteDetailComponent,

    PopupSecteurActiviteComponent,
  ]
})
export class ComposantModule { }
