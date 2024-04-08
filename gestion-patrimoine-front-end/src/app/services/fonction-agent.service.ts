import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { FonctionAgent } from '../model/fonction-agent.model';


@Injectable({
  providedIn: 'root'
})
export class FonctionAgentService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


   // RECHERCHER FonctionAgent SANS DOUBLONS
   public searchFonctionAgentListFilterDouble(term: string, listeFonctionAgent: FonctionAgent[]): Observable<FonctionAgent[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de FonctionAgent en FonctionAgent du terme de recherche
    const filteredFonctionAgent: FonctionAgent[] = listeFonctionAgent.filter((fonctionAgent) =>
    fonctionAgent.codeFonctionAgent.toString().includes(term.toLowerCase()) || fonctionAgent.libelleFonctionAgent.toLowerCase().includes(term.toLowerCase())
    );

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredFonctionAgent1: FonctionAgent[] = filteredFonctionAgent.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.libelleFonctionAgent === item.libelleFonctionAgent || t.codeFonctionAgent === item.codeFonctionAgent
      ))
    );

    return of(filteredFonctionAgent1);
  }

  // RECHERCHER FonctionAgent
  public searchFonctionAgentList(term: string, listeFonctionAgent: FonctionAgent[]): Observable<FonctionAgent[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de FonctionAgent en FonctionAgent du terme de recherche
    const filteredFonctionAgent = listeFonctionAgent.filter((FonctionAgent) =>
      this.doesFonctionAgentMatchTerm(FonctionAgent, term)
    );

    return of(filteredFonctionAgent);
  }

  private doesFonctionAgentMatchTerm(fonctionAgent: FonctionAgent, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du
    const termLowerCase = term.toLowerCase();
    return (
      fonctionAgent.codeFonctionAgent.toString().includes(termLowerCase) || fonctionAgent.libelleFonctionAgent.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }




  public listeFonctionAgents(): Observable<FonctionAgent[]> {
    return this.httpClient.get<FonctionAgent[]>(`${this.urlServeur}/FonctionAgents`, { withCredentials: true });
  }

  public ajouterFonctionAgents(fonctionAgent: FonctionAgent): Observable<FonctionAgent> {
    return this.httpClient.post<FonctionAgent>(`${this.urlServeur}/AjouterFonctionAgent`, fonctionAgent, { withCredentials: true });
  }

  public modifierFonctionAgent(fonctionAgent: FormData): Observable<FonctionAgent> {
    return this.httpClient.put<FonctionAgent>(`${this.urlServeur}/ModifierFonctionAgent`, fonctionAgent, { withCredentials: true });
  }

  public supprimerFonctionAgentById(codeFonctionAgent: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerFonctionAgentById/${codeFonctionAgent}`, { withCredentials: true });
  }


}
