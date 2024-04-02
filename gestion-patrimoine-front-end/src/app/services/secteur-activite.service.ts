import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { DatePipe } from '@angular/common';
import { SecteurActivite } from '../model/secteur-activite.model';

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {

  private urlServeur = environment.rooturl1;

  constructor(
    private httpClient: HttpClient
  ) {}


   // RECHERCHER SecteurActivite SANS DOUBLONS
   public searchSecteurActiviteListFilterDouble(term: string, listeSecteurActivite: SecteurActivite[]): Observable<SecteurActivite[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de secteurActivites en fonction du terme de recherche
    const filteredSecteurActivite: SecteurActivite[] = listeSecteurActivite.filter((secteurActivite) =>
    secteurActivite.codeSecteurActivite.toString().includes(term.toLowerCase()) || secteurActivite.libelleSecteurActivite.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredSecteurActivite1: SecteurActivite[] = filteredSecteurActivite.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.libelleSecteurActivite === item.libelleSecteurActivite || t.codeSecteurActivite === item.codeSecteurActivite
      ))
    );

    return of(filteredSecteurActivite1);
  }

  // RECHERCHER UniteDouaniere
  public searchSecteurActiviteList(term: string, listeSecteurActivite: SecteurActivite[]): Observable<SecteurActivite[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de UniteDouaniere en fonction du terme de recherche
    const filteredSecteurActivite = listeSecteurActivite.filter((secteurActivite) =>
      this.doesSecteurActiviteMatchTerm(secteurActivite, term)
    );

    return of(filteredSecteurActivite);
  }

  private doesSecteurActiviteMatchTerm(secteurActivite: SecteurActivite, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du uniteDouaniere
    const termLowerCase = term.toLowerCase();
    return (
      secteurActivite.codeSecteurActivite.toString().includes(termLowerCase) || secteurActivite.libelleSecteurActivite.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }




  public listeSecteurActivites(): Observable<SecteurActivite[]> {
    return this.httpClient.get<SecteurActivite[]>(`${this.urlServeur}/SecteurActivites`);
  }

  public ajouterSecteurActivite(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.post<SecteurActivite>(`${this.urlServeur}/AjouterSecteurActivite`, secteurActivite);
  }

  public modifierSecteurActivite(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.put<SecteurActivite>(`${this.urlServeur}/ModifierSecteurActivite`, secteurActivite);
  }

  public supprimerSecteurActivite(identifiantBL: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerSecteurActiviteById/${identifiantBL}`);
  }


}
