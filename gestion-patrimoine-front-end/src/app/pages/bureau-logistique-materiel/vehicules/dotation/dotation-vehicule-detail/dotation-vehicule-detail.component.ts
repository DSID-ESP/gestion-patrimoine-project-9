import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonSortie } from 'src/app/model/bon-sortie.model';
import { UniteDouaniere } from 'src/app/model/unite-douaniere.model';
import { TypeUniteDouaniere } from 'src/app/model/type-unite-douaniere.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BonSortieService } from 'src/app/services/bon-sortie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeUniteDouaniereService } from 'src/app/services/type-unite-douaniere.service';
import { UniteDouaniereService } from 'src/app/services/unite-douaniere.service';
import { SecuriteService } from 'src/app/services/securite.service';
import { MyDateService } from 'src/app/services/my-date.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyDate } from 'src/app/model/my-date.model';
import { ArticleBonPourService } from 'src/app/services/article-bon-pour.service';
import { ArticleBonPour } from 'src/app/model/article-bon-pour.model';
import { ArticleBonSortie } from 'src/app/model/article-bon-sortie.model';
import { BonPour } from 'src/app/model/bon-pour.model';
import { NgForm } from '@angular/forms';
import { Agent } from 'src/app/model/agent.model';
import { AgentService } from 'src/app/services/agent.service';
import { DotationVehicule } from 'src/app/model/dotation-vehicule.model';
import { DotationVehiculeService } from 'src/app/services/dotation-vehicule.service';
import { DotationVehiculeVehiculeAjouterComponent } from '../dotation-vehicule-vehicule-ajouter/dotation-vehicule-vehicule-ajouter.component';
import { SecteurActivite } from 'src/app/model/secteur-activite.model';
import { Prestataires } from 'src/app/model/prestataires.model';
import { SecteurActiviteService } from 'src/app/services/secteur-activite.service';
import { Vehicule } from 'src/app/model/vehicule.model';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { BonPourService } from 'src/app/services/bon-pour.service';
import { TypeObjet } from 'src/app/model/type-objet.model';
import { DotationVehiculeAjouterComponent } from '../dotation-vehicule-ajouter/dotation-vehicule-ajouter.component';
import { ArticleBonSortieService } from 'src/app/services/article-bon-sortie.service';
import { TypeObjetPatrimoine } from 'src/app/enum/type-objet-patrimoine.enum';
import { UniteDouaniereDetailComponent } from 'src/app/pages/unite-douaniere/unite-douaniere-detail/unite-douaniere-detail.component';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dotation-vehicule-detail',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './dotation-vehicule-detail.component.html',
  styleUrl: './dotation-vehicule-detail.component.css'
})
export class DotationVehiculeDetailComponent implements OnInit, OnDestroy {



  rowNumber!: number;

  quantiteAccordeeTotal!: number;
  //rowQuantiteAccorde!: number;


  peutImprimer: Boolean = false;


  public bonSorties: BonSortie[] = [];
  public bonSortie: BonSortie = new BonSortie();

  public articleBonPours: ArticleBonPour[] = [];
  public articleBonPour: ArticleBonPour = new ArticleBonPour();

  public articleBonSorties: ArticleBonSortie[] = [];
  public articleBonSortie: ArticleBonSortie = new ArticleBonSortie();

  public typeObjets: TypeObjet[] = [];
  public typeObjet: TypeObjet = new TypeObjet();

  public dotationVehicules: DotationVehicule[] = [];
  public dotationVehicule: DotationVehicule = new DotationVehicule();

  public bonPours: BonPour[] = [];
  public bonPour: BonPour = new BonPour();

  public uniteDouanieres: UniteDouaniere[] = [];
  public uniteDouaniere: UniteDouaniere | undefined;

  public typeUniteDouanieres: TypeUniteDouaniere[] = [];
  public typeUniteDouaniere: TypeUniteDouaniere | undefined;

  public agents: Agent[] = [];
  public agent: Agent = new Agent();

  public vehiculesSelect: Vehicule[] = [];

  public vehicules: Vehicule[] = [];
  public vehicule: Vehicule = new Vehicule();


  private subscriptions: Subscription[] = [];


  /* ----------------------------------------------------------------------------------------- */
  // tableau
  // columnsToCodeMarque: string[] = [
  //   "codeMarque"
  // ];
  // columnsToCodePays: string[] = [
  //   "codePays"
  // ];
  columnsDateFormat: string[] = [

  ];
  columnsToHide: string[] = [
  ];
  dataSource = new MatTableDataSource<ArticleBonPour>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    "rowNumber",
    // "codeArticleBonPour",
    "libelleArticleBonPour",
    "quantiteDemandee",
    "rowQuantiteAccorde",
    // "rowQuantiteAccorde",
    "rowCodeTypeObjet"


  ];
  displayedColumnsCustom: string[] = [
    "N°",
    // "Code article",
    "Description article bon pour",
    "Qte Demandée",
    "Qte Accordée Définitive",
    "Nature"


  ];
  /* ----------------------------------------------------------------------------------------- */


  constructor(
    private articleBonPourService: ArticleBonPourService,
    private bonPourService: BonPourService,
    private bonSortieService: BonSortieService,
    private articleBonSortieService: ArticleBonSortieService,
    private vehiculeService: VehiculeService,
    // private dotationVehiculeService: DotationVehiculeService,
    private agentService: AgentService,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    // private typeUniteDouaniereService: TypeUniteDouaniereService,
    // private uniteDouaniereService: UniteDouaniereService,
    private securiteService: SecuriteService,
    private myDateService: MyDateService
  ) { }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  ngOnInit(): void {

    // this.listeArticles();
    // this.listeBonDeSorties();
    this.listeAgents();
    // this.listeDotations();
    this.listeVehicules();
    this.listeArticleBonSortie();
    // --------------------------------------------------------------------------------
    const id = this.route.snapshot.paramMap.get('identifiantBonPour') ?? '';
    // const codeArticleBonPour = this.route.snapshot.paramMap.get('codeArticleBonPour') ?? '';


    const decrypt = this.securiteService.decryptUsingAES256(id);

    // const decrypt2 = this.securiteService.decryptUsingAES256(codeArticleBonPour);


    // --------------------------------------------------------------------------------
    //  const identifiantBP = this.route.snapshot.paramMap.get('identifiantBP') ?? '';
    //  const decrypt = this.securiteService.decryptUsingAES256(identifiantBP);



    // console.log(decrypt);



    if (decrypt) {

      this.subscriptions.push(this.bonPourService.recupererBonPourById(decrypt).subscribe({
        next: (response: BonPour) => {

          if (response) {
            this.bonPour = response;
            this.listeBonDeSorties(this.bonPour);
          }
          
          // this.listeArticleBonPours();
        },
        error: (errorResponse: HttpErrorResponse) => {

        }
      }));
    }

  }


  goToDetailUniteDouaniere(uniteDouaniere: UniteDouaniere, consultation: Boolean): void {
    const dialogRef = this.matDialog.open(
      UniteDouaniereDetailComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: {
          uniteDouaniere: uniteDouaniere,
          consultation: consultation
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }


  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  public listeBonDeSorties(bonPour: BonPour): void {

    const subscription = this.bonSortieService.listeBonSorties().subscribe({
      next: (response: BonSortie[]) => {
        this.bonSorties = response;

        // Utilisez la méthode find pour rechercher le bon de sortie correspondant
        this.bonSortie = this.bonSorties.find(bonSortie =>
          bonPour &&
          bonSortie.codeArticleBonPour.identifiantBonPour === bonPour.identifiantBonPour
        ) ?? new BonSortie();


        this.listeArticleBonPours(bonPour, this.bonSorties);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  public listeArticleBonSortie(): void {

    const subscription = this.articleBonSortieService.listeArticleBonSorties().subscribe({
      next: (response: ArticleBonSortie[]) => {
        this.articleBonSorties = response;
        // console.log(this.agents);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


  public listeArticleBonPours(bonPour: BonPour, bonSorties: BonSortie[]): void {

    const subscription = this.articleBonPourService.listeArticleBonPours().subscribe({
      next: (response: ArticleBonPour[]) => {
        //this.articleBonPours = response;

        this.articleBonPours =  response.filter(articleBonPour => articleBonPour.codeTypeObjet.libelleTypeObjet === TypeObjetPatrimoine.VEHIC)

        if (bonPour.identifiantBonPour != "" && this.articleBonPours.length > 0) {

          // let articleBonPoursListe: ArticleBonPour[] | undefined;

          const articleBonPoursListe: ArticleBonPour[] = this.articleBonPours.filter(articleBonPour => articleBonPour.identifiantBonPour === bonPour.identifiantBonPour);
          
          this.rowNumber = 1;

          this.dataSource = new MatTableDataSource<ArticleBonPour>(articleBonPoursListe.map((item) => ({
            ...item,
            rowCodeTypeObjet: item.codeTypeObjet.libelleTypeObjet,
            rowNumber: this.rowNumber++,
            rowQuantiteAccorde: this.quantiteAccordeeByIdentifiantBonSortie(item, bonSorties, this.articleBonSorties)
          })));

          this.dataSource.paginator = this.paginator;

        } else {
          console.error('articles BonPour is undefined');
        }


      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }



  quantiteAccordeeByIdentifiantBonSortie(articleBonPour: ArticleBonPour, bonSorties: BonSortie[], articleBonSorties: ArticleBonSortie[]): number {

    // Initialiser la quantité totale à 0
    this.quantiteAccordeeTotal = 0;

    // Rechercher l'articleBonPour dans les bonSorties
    const bonSortiesTrouves: BonSortie[] = bonSorties.filter(
      bonSortie =>
        bonSortie &&
        bonSortie.codeArticleBonPour &&
        articleBonPour.identifiantBonPour === bonSortie.codeArticleBonPour.identifiantBonPour &&
        articleBonPour.codeArticleBonPour === bonSortie.codeArticleBonPour.codeArticleBonPour
    );

    // Filtrer les articles bon sortie associés à ce bon de sortie
    if (bonSortiesTrouves.length > 0) {
      // Calculer la quantité totale accordée pour les articles associés à tous les bons de sortie trouvés
      this.quantiteAccordeeTotal += bonSortiesTrouves.reduce((total, bonSortieAssocie) => {
        // Filtrer les articles associés à ce bon de sortie et calculer leur quantité totale accordée
        const quantiteBonSortieAssocie = articleBonSorties
          .filter(article => article.identifiantBonSortie === bonSortieAssocie.identifiantBonSortie)
          .reduce((totalArticle, article) => {
            return totalArticle + (article && article.quantiteAccordeeDefinitive !== 0 && article.quantiteAccordeeDefinitive !== null ? article.quantiteAccordeeDefinitive : 0);
          }, 0);
        // Ajouter la quantité totale accordée pour les articles associés à ce bon de sortie à la quantité totale
        return total + quantiteBonSortieAssocie;
      }, 0);
    }

    if (this.quantiteAccordeeTotal > 0) {
      this.peutImprimer = true;
    }



    return this.quantiteAccordeeTotal;
}



  // nombreArticleBonEntree(bonPour: BonPour, articleBonPours: ArticleBonPour[]): number {
  //   return articleBonPours.reduce((count, article) => {
  //     if (bonPour && article.identifiantBonPour && bonPour.identifiantBonPour === article.identifiantBonPour) {
  //       return count + 1;
  //     }
  //     return count;
  //   }, 1);
  // }




  public listeVehicules(): void {

    const subscription = this.vehiculeService.listeVehicules().subscribe({
      next: (response: Vehicule[]) => {
        this.vehicules = response;
        // console.log(this.secteurActivites);

      },
      error: (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
      },
    });

    this.subscriptions.push(subscription);
  }


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

  generatePDF(bonPour: BonPour): void {

    const data: ArticleBonPour[] = this.dataSource.filteredData;
    // const bonPour: BonPour = this.bonPour;

    const months = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

    // Création d'un nouveau document jsPDF
    const doc = new jsPDF();

    // const fontName = 'times'; // Nom de la police (vous pouvez remplacer 'times' par le nom de la police que vous souhaitez utiliser)

    const texteFontName = 'Roboto-Regular'; // Nom de la police (vous pouvez remplacer 'times' par le nom de la police que vous souhaitez utiliser)
    const texteFontSize = 8; // Taille de la police


    // Définition du texte au-dessus de l'image
    const titre = "BON DE SORTIE N° 10232";
    const titreX = 60; // Position horizontale du texte
    const titreY = 45; // Position verticale du texte
    const titreFontName = 'Roboto-Regular'; // Nom de la police (vous pouvez remplacer 'times' par le nom de la police que vous souhaitez utiliser)
    const titreFontSize = 15; // Taille de la police

    // Déterminer la longueur du texte et la largeur de la page
    const titreLength = doc.getStringUnitWidth(titre) * titreFontSize / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    // Calculer la position horizontale pour centrer le texte
    const titreXCentered = (pageWidth - titreLength) / 2;


    // Ajout du logo à l'en-tête
    const logoImg = new Image();
    logoImg.src = '../../../../../assets/douanes.jpeg'; // Assurez-vous de remplacer 'path/to/your/logo.png' par le chemin de votre propre logo

    const logoWidth = 24; // Largeur du logo
    const logoHeight = 16; // Hauteur du logo
    const logoMarginLeft = 18;
    const logoMarginTop = 18;

    const marginLeft = 10;
    const marginTop = 40;
    const marginRight = 10;
    const marginBottom = 10;

    // Attendre que l'image soit chargée avant de l'ajouter au document
    logoImg.onload = function () {
      doc.setFont(texteFontName, 'normal'); // Définition de la police d'écriture et de son style
      doc.setFontSize(texteFontSize); // Définition de la taille de la police
      doc.text("République du Sénégal", 16, 8);
      doc.text("Ministère des Finances et du budget", 10, 12);
      doc.text("Direction générale des Douanes", 13, 16);

      doc.setFont(titreFontName, 'bold'); // Définition de la police d'écriture et de son style
      doc.setFontSize(titreFontSize); // Définition de la taille de la police
      doc.text(titre, titreXCentered, titreY);

      doc.addImage(logoImg, 'JPEG', logoMarginLeft, logoMarginTop, logoWidth, logoHeight);

      // --------------------------------------------------------------------------
      // --------------------------------------------------------------------------
      generateTable1(); 
      // --------------------------------------------------------------------------
      // --------------------------------------------------------------------------
      // generateTable2();
      // --------------------------------------------------------------------------
      // --------------------------------------------------------------------------
      // generateTable3();
      // --------------------------------------------------------------------------
      // --------------------------------------------------------------------------
      // generateTable4();
      // --------------------------------------------------------------------------
      // --------------------------------------------------------------------------
    };


    function generateTable1() {

      // const tableData = data.map((item: ArticleBonPour) => [
      //   item.identifiantBonPour,
      //   // item.dateCourrielOrigine ? `${new Date(item.dateCourrielOrigine.toString()).getDate()} ${months[new Date(item.dateCourrielOrigine.toString()).getMonth()]} ${new Date(item.dateCourrielOrigine.toString()).getFullYear()}` : 'N/A',
      // ]);

      // const tableData: BonPour[] = [bonPour]; 
      // const tableData: BonPour = bonPour;

  
      // Générer le tableau dans le PDF avec des styles de texte personnalisés
      autoTable(doc, {
        head: [
          [
            { content: 'Bon Pour', styles: { fontSize: 8, halign: 'center', valign: 'middle', fillColor: [97, 176, 118], fontStyle: 'bold' }, colSpan: 4 }               
          ]
        ],
        body: [
          [
            // { content: 'N° courrier origine\n'+(bonPour.numeroCourrielOrigine ? bonPour.numeroCourrielOrigine.toString() : ''), styles: { fontSize: 6, halign: 'left', valign: 'middle', fontStyle: 'bold' }, },
            { content: 'N° courrier origine', styles: { fontSize: 7, halign: 'left', valign: 'bottom', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold' } },
            { content: 'Date courrier origine', styles: { fontSize: 7, halign: 'left', valign: 'bottom', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold'  } },
            { content: 'Etat bon pour', styles: { fontSize: 7, halign: 'left', valign: 'middle', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold' } },
            { content: '' }
          ],
          [
            { content: bonPour.numeroCourrielOrigine ? bonPour.numeroCourrielOrigine.toString() : '', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 } },
            { content: bonPour.dateCourrielOrigine ? `${new Date(bonPour.dateCourrielOrigine.toString()).getDate()} ${months[new Date(bonPour.dateCourrielOrigine.toString()).getMonth()]} ${new Date(bonPour.dateCourrielOrigine.toString()).getFullYear()}` : 'N/A', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 } },
            { content: bonPour.etatBonPour ? bonPour.etatBonPour.toString() : '', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 } },
            { content: '' }
          ],
          [
            { content: 'Unité douanière', styles: { fontSize: 7, halign: 'left', valign: 'bottom', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold' }, colSpan: 3 },
            { content: '' }
          ],
          [
            { content: bonPour.codeUniteDouaniere.nomUniteDouaniere ? bonPour.codeUniteDouaniere.nomUniteDouaniere.toString() : '', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 }, colSpan: 3 },
            { content: '' }
          ],
          [
            { content: 'Object Courrier origine', styles: { fontSize: 7, halign: 'left', valign: 'bottom', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold' }, colSpan: 3  },
            { content: '' }
          ],
          [
            { content: bonPour.objectCourrielOrigine ? bonPour.objectCourrielOrigine.toString() : '', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 }, colSpan: 3 },
            { content: '' }
          ],
          [
            { content: 'Description bon pour', styles: { fontSize: 7, halign: 'left', valign: 'bottom', minCellHeight: 1, cellPadding: 1, fontStyle: 'bold' }, colSpan: 3  },
            { content: '' }
          ],
          [
            { content: bonPour.descriptionBonPour ? bonPour.descriptionBonPour.toString() : '', styles: { fontSize: 6, halign: 'left', valign: 'top', cellPadding: 1 }, colSpan: 3 },
            { content: '' }
          ]

        ],
        margin: { top: marginTop + 10, right: marginRight, bottom: marginBottom, left: marginLeft },
        theme: 'plain',
        // tableLineColor: [0, 0, 0], 
        // tableLineWidth: 0.1, 
        // didDrawCell: function (data) {
        //   doc.setLineWidth(0.1);
        //   doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
        //   doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
        // }
      });

      // ------------------------------------------------------------------
      // doc.save('liste-bon-pour.pdf');
      // ------------------------------------------------------------------
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }

    function generateTable2() {
      // Création des données du tableau pour autoTable
      const tableData = data.map((item: ArticleBonPour) => [
        item.identifiantBonPour,
        // item.dateCourrielOrigine ? `${new Date(item.dateCourrielOrigine.toString()).getDate()} ${months[new Date(item.dateCourrielOrigine.toString()).getMonth()]} ${new Date(item.dateCourrielOrigine.toString()).getFullYear()}` : 'N/A',
      ]);

      // Générer le tableau dans le PDF avec des styles de texte personnalisés
      autoTable(doc, {
        head: [
          [
            { content: 'N° courrier origine', styles: { fontSize: 6, halign: 'center', valign: 'middle', fillColor: [176, 196, 222] } }         
          ]
        ],
        body: tableData.map(row => row.map(cell => ({ content: cell ? cell.toString() : '', styles: { fontSize: 6, halign: 'center', valign: 'middle' } }))),
        margin: { top: marginTop + logoHeight + 65, right: marginRight, bottom: marginBottom, left: marginLeft },
        theme: 'plain',
        tableLineColor: [0, 0, 0], 
        tableLineWidth: 0.1, 
        didDrawCell: function (data) {
          doc.setLineWidth(0.1);
          doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
        }
      });

      // ------------------------------------------------------------------
      // doc.save('liste-bon-pour.pdf');
      // ------------------------------------------------------------------
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }

    function generateTable3() {
      // Création des données du tableau pour autoTable
      const tableData = data.map((item: ArticleBonPour) => [
        item.identifiantBonPour,
        // item.dateCourrielOrigine ? `${new Date(item.dateCourrielOrigine.toString()).getDate()} ${months[new Date(item.dateCourrielOrigine.toString()).getMonth()]} ${new Date(item.dateCourrielOrigine.toString()).getFullYear()}` : 'N/A',
      ]);

      // Générer le tableau dans le PDF avec des styles de texte personnalisés
      autoTable(doc, {
        head: [
          [
            { content: 'N° courrier origine', styles: { fontSize: 6, halign: 'center', valign: 'middle', fillColor: [176, 196, 222] } }         
          ]
        ],
        body: tableData.map(row => row.map(cell => ({ content: cell ? cell.toString() : '', styles: { fontSize: 6, halign: 'center', valign: 'middle' } }))),
        margin: { top: marginTop + logoHeight + 65, right: marginRight, bottom: marginBottom, left: marginLeft },
        theme: 'plain',
        tableLineColor: [0, 0, 0], 
        tableLineWidth: 0.1, 
        didDrawCell: function (data) {
          doc.setLineWidth(0.1);
          doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
        }
      });

      // ------------------------------------------------------------------
      // doc.save('liste-bon-pour.pdf');
      // ------------------------------------------------------------------
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }

    function generateTable4() {
      // Création des données du tableau pour autoTable
      const tableData = data.map((item: ArticleBonPour) => [
        item.identifiantBonPour,
        // item.dateCourrielOrigine ? `${new Date(item.dateCourrielOrigine.toString()).getDate()} ${months[new Date(item.dateCourrielOrigine.toString()).getMonth()]} ${new Date(item.dateCourrielOrigine.toString()).getFullYear()}` : 'N/A',
      ]);

      // Générer le tableau dans le PDF avec des styles de texte personnalisés
      autoTable(doc, {
        head: [
          [
            { content: 'N° courrier origine', styles: { fontSize: 6, halign: 'center', valign: 'middle', fillColor: [176, 196, 222] } }         
          ]
        ],
        body: tableData.map(row => row.map(cell => ({ content: cell ? cell.toString() : '', styles: { fontSize: 6, halign: 'center', valign: 'middle' } }))),
        margin: { top: marginTop + logoHeight + 65, right: marginRight, bottom: marginBottom, left: marginLeft },
        theme: 'plain',
        tableLineColor: [0, 0, 0], 
        tableLineWidth: 0.1, 
        didDrawCell: function (data) {
          doc.setLineWidth(0.1);
          doc.line(data.cell.x, data.cell.y, data.cell.x, data.cell.y + data.cell.height); // Vertical line
          doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height); // Horizontal line
        }
      });

      // ------------------------------------------------------------------
      // doc.save('liste-bon-pour.pdf');
      // ------------------------------------------------------------------
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }

  // AfficherFormBonSortie(bonPour: BonPour, bonSorties: BonSortie[]): BonSortie {


  //   for (const bonSortie of bonSorties) {
  //     // Comparer les bonEntree ici (assurez-vous d'implémenter une méthode de comparaison dans la classe BonEntree)
  //     if (bonPour && bonSortie.codeArticleBonPour.identifiantBonPour && JSON.stringify(bonPour) === JSON.stringify(bonSortie.codeArticleBonPour.identifiantBonPour)) {

  //       return bonSortie;
  //     }

  //   }


  //   return new BonSortie();
  // }


  // filtreBonPourArticleBonSortie(bonPour: BonPour, bonDeSorties: BonDeSortie[]): BonDeSortie {
  //   return bonDeSorties.find(bonDeSortie =>
  //       Array.isArray(bonDeSortie.identifiantBP) && bonDeSortie.identifiantBP.some(bp => bp === bonPour)
  //   ) ?? new BonDeSortie();
  // }



  myDateStringFormatter(date: MyDate | string | undefined | null): string {
    if (!date) {
      return '';
    }

    if (typeof date === 'string') {
      return this.myDateService.formatterMyDateFromString(date);
    } else {
      return this.myDateService.formatterMyDate(date);
    }
  }

  // popupAjouterBonSortie(): void {
  //   const dialogRef = this.matDialog.open(
  //     DotationVehiculeAjouterBonSortieComponent,
  //     {
  //       width: '80%',
  //       enterAnimationDuration: '100ms',
  //       exitAnimationDuration: '100ms'
  //     }
  //   );

  //   dialogRef.afterClosed().subscribe(() => {
  //     this.ngOnInit();
  //   });
  // }



  goToDetail(bonSortie: BonSortie): void {
    const id = bonSortie.identifiantBonSortie;
    // console.log(id);

    const encrypt = this.securiteService.encryptUsingAES256(id);
    this.router.navigate(['/dotation-vehicule-detail-bon-sortie-detail', encrypt]);
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId)?.click();
  }

  // pour envoyer tous les formulaires
  public submitForm(): void {


    this.submitBonSortieForm();
    // this.submitBonEntreeForm();

    // this.popupFermer();
    // this.router.navigate(['/ajouter-article']);
  }

  // pour executer ajouterBordereauLivraison
  public submitBonSortieForm(): void {
    this.clickButton('bon-sortie-form')
  }

  // recupererBonPourByIdentifiantBonPour(identifiantBonPour: string): BonPour | undefined {

  //   let bonPour: BonPour | undefined;

  //   // console.log(this.bonSorties);

  //   bonPour = this.bonPours.find(bonPour => bonPour.identifiantBonPour === identifiantBonPour);

  //   return bonPour
  // }


  public ajouterBonSortie(BonSortieForm: NgForm): void {

    //  AGENT
    BonSortieForm.value.numeroBonSortie = 'BS005';
    BonSortieForm.value.matriculeAgent = this.agents[0];
    BonSortieForm.value.identifiantBonPour = this.bonPour;

    // CONFORMITE BORDEREAU LIVRAISON
    // BordereauLivraisonForm.value.conformiteBL = 'oui';

    console.log(BonSortieForm.value);


    this.subscriptions.push(this.bonSortieService.ajouterBonSortie(BonSortieForm.value).subscribe({
      next: (response: BonSortie) => {
        this.bonSortie = response;
        console.log(this.bonSortie);

      },
      error: (errorResponse: HttpErrorResponse) => {

      }
    })
    );

  }


  // public listeDotations(): void {

  //   const subscription = this.dotationVehiculeService.listeDotationVehicules().subscribe({
  //     next: (response: DotationVehicule[]) => {

  //       this.dotationVehicules = response;

  //       // console.log(response);


  //       // this.vehicules = response.sort((a, b) => parseInt(a.numeroImmatriculation) - parseInt(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => Number(a.numeroImmatriculation) - Number(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroImmatriculation.localeCompare(b.numeroImmatriculation));
  //       // this.vehicules = response.sort((a, b) => a.numeroChassis - b.numeroChassis);
  //       // this.vehicules = response.sort((a, b) => new Date(b.dateModification).getTime() - new Date(a.dateModification).getTime());

  //       // this.rowNumber = 1;

  //       // this.dataSource = new MatTableDataSource<IVehicule>(this.vehicules);
  //       this.dataSource = new MatTableDataSource<DotationVehicule>(this.dotationVehicules.map((item) => ({
  //         ...item,

  //         rowQuantiteAccordee: item.identifiantBS.quantiteAccordee,
  //         // rowQuantiteDemandee: item.identifiantBS.identifiantBS.


  //         // vehicule: [] as Vehicule[],
  //         // rowMarque: item.codeMarque.libelleMarque,
  //         // rowPays: item.codePays.libellePays,
  //         // rowEtat: item.codeEtat.libelleEtat,
  //         // rowTypeEnergie: item.codeTypeEnergie.libelleTypeEnergie,
  //         // rowTypeVehicule: item.codeTypeVehicule.libelleTypeVehicule,
  //         // rowLibelleArticleBonEntree: item.identifiantBE.libelleArticleBonEntree,
  //         // rowNumber: this.rowNumber++,
  //       })));


  //       // console.log(this.dataSource.data);
  //       this.dataSource.paginator = this.paginator;
  //     },
  //     error: (errorResponse: HttpErrorResponse) => {
  //       // console.log(errorResponse);
  //     },
  //   });

  //   this.subscriptions.push(subscription);
  // }


  popupAjouter(vehicules: Vehicule[], bonSortie: BonSortie, vehiculesSelect?: Vehicule[]): void {
    const dialogRef = this.matDialog.open(
      DotationVehiculeVehiculeAjouterComponent,
      {
        width: '80%',
        height: 'auto',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',

        data: {
          vehicules: vehicules,
          bonDeSortie: bonSortie,
          vehiculesSelected: vehiculesSelect
        }
      }

    );

    dialogRef.afterClosed().subscribe(() => {
      // ----------------------------------
      // Accéder à this.secteurActivitesForm après la fermeture du popup
      // if (dialogRef.componentInstance instanceof DotationVehiculeVehiculeAjouterComponent) {
      //   this.vehiculesSelect = dialogRef.componentInstance.vehiculesSelect;
      //   // console.log(this.secteurActivitesSelect);
      // }
      // ----------------------------------
      this.ngOnInit();
    });
  }


  popupAjouterDotationVehicule(articleBonPour: ArticleBonPour, quantiteAccordeeTotal: number, bonPour: BonPour): void {

    console.log(articleBonPour,quantiteAccordeeTotal);

    const dialogRef = this.matDialog.open(
      DotationVehiculeAjouterComponent,
      {
        width: '80%',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data:  {
          articleBonPour: articleBonPour,
          quantiteAccordeeTotal: quantiteAccordeeTotal,
          bonpour: bonPour
        }
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }





}
