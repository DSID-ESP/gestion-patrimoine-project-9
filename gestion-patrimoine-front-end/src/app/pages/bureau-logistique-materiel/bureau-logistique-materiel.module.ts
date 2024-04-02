import { LOCALE_ID, NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

import { BureauLogistiqueMaterielRoutingModule } from './bureau-logistique-materiel-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatTableExporterModule } from 'mat-table-exporter';

import { ReceptionVehiculeListeComponent } from './vehicules/reception/reception-vehicule-liste/reception-vehicule-liste.component';
import { ConsultationVehiculeListeComponent } from './vehicules/consultation/consultation-vehicule-liste/consultation-vehicule-liste.component';
import { ReceptionVehiculeAjouterBonEntreeComponent } from './vehicules/reception/reception-vehicule-ajouter-bon-entree/reception-vehicule-ajouter-bon-entree.component';
import { ReceptionVehiculeDetailComponent } from './vehicules/reception/reception-vehicule-detail/reception-vehicule-detail.component';
import { ConsultationVehiculeDetailComponent } from './vehicules/consultation/consultation-vehicule-detail/consultation-vehicule-detail.component';
import { ReceptionVehiculeListeDetailComponent } from './vehicules/reception/reception-vehicule-liste-detail/reception-vehicule-liste-detail.component';
import { ReceptionVehiculeAjouterArticleComponent } from './vehicules/reception/reception-vehicule-ajouter-article/reception-vehicule-ajouter-article.component';
import { ConsultationReceptionVehiculeListeComponent } from './vehicules/consultation/consultation-reception-vehicule-liste/consultation-reception-vehicule-liste.component';
import { ConsultationReceptionVehiculeDetailComponent } from './vehicules/consultation/consultation-reception-vehicule-detail/consultation-reception-vehicule-detail.component';
import { ReceptionVehiculeModifierBonEntreeComponent } from './vehicules/reception/reception-vehicule-modifier-bon-entree/reception-vehicule-modifier-bon-entree.component';
import { DotationVehiculeListeComponent } from './vehicules/dotation/dotation-vehicule-liste/dotation-vehicule-liste.component';
import { DotationVehiculeAjouterBonSortieComponent } from './vehicules/dotation/dotation-vehicule-ajouter-bon-sortie/dotation-vehicule-ajouter-bon-sortie.component';
import { DotationVehiculeDetailBonSortieComponent } from './vehicules/dotation/dotation-vehicule-detail-bon-sortie/dotation-vehicule-detail-bon-sortie.component';
import { DotationVehiculeAjouterComponent } from './vehicules/dotation/dotation-vehicule-ajouter/dotation-vehicule-ajouter.component';
import { DotationVehiculeDetailComponent } from './vehicules/dotation/dotation-vehicule-detail/dotation-vehicule-detail.component';
import { AuthActivateRouteGuard } from 'src/app/routeguards/auth.routeguard';
import { XhrInterceptor } from 'src/app/interceptors/app.request.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { ComposantModule } from 'src/app/composants/composant.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
// Enregistrer les données de localisation française
registerLocaleData(localeFr);

@NgModule({
  declarations: [

    ReceptionVehiculeAjouterBonEntreeComponent,
    ReceptionVehiculeModifierBonEntreeComponent,
    ReceptionVehiculeAjouterArticleComponent,
    ReceptionVehiculeDetailComponent,
    ReceptionVehiculeListeComponent,
    ReceptionVehiculeListeDetailComponent,

    ConsultationVehiculeListeComponent,
    ConsultationVehiculeDetailComponent,
    ConsultationReceptionVehiculeListeComponent,
    ConsultationReceptionVehiculeDetailComponent,

    DotationVehiculeListeComponent,
    DotationVehiculeAjouterBonSortieComponent,
    DotationVehiculeDetailBonSortieComponent,
    DotationVehiculeAjouterComponent,
    DotationVehiculeDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // ngif ngfor
    FormsModule,
    ReactiveFormsModule, // pour formGroup
    BrowserAnimationsModule,
    HttpClientModule, // pour le backend

    MatAutocompleteModule,
    AsyncPipe,
    MatFormFieldModule,


    NgbModule, // dropdown

    ComposantModule, // composant


    // MatPaginator,

    MatTableModule, MatPaginatorModule,

    MatExpansionModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,

    NgToastModule,

    // MatTableExporterModule,

    // MDCDialog

    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),

    BureauLogistiqueMaterielRoutingModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    },
    { 
      provide: LOCALE_ID, useValue: "fr-FR"
    },
    AuthActivateRouteGuard,
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initializeKeycloak,
  //     multi: true,
  //     deps: [KeycloakService],
  //  },
   DatePipe,

  ],
})
export class BureauLogistiqueMaterielModule { }
