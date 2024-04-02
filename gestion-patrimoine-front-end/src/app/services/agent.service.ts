import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Agent } from '../model/agent.model';



@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  // ----------------------------------------------------------------------------
  // RECHERCHER AGENTS SANS DOUBLONS
  public searchAgentListFilterDouble(term: string, listeAgents: Agent[]): Observable<Agent[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de agents en fonction du terme de recherche
    const filteredAgents: Agent[] = listeAgents.filter((agents) =>
    agents.numeroTelephoneAgent.toString().includes(term.toLowerCase()) || agents.emailAgent.toLowerCase().includes(term.toLowerCase()));

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredAgents1: Agent[] = filteredAgents.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.emailAgent === item.emailAgent || t.numeroTelephoneAgent === item.numeroTelephoneAgent
      ))
    );

    return of(filteredAgents1);
  }

  // RECHERCHER Agent
  public searchAgentsList(term: string, listeAgents: Agent[]): Observable<Agent[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste d'Agents en fonction du terme de recherche
    const filteredAgents = listeAgents.filter((agent) =>
      this.doesAgentMatchTerm(agent, term)
    );

    return of(filteredAgents);
  }

  private doesAgentMatchTerm(agent: Agent, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs agents
    const termLowerCase = term.toLowerCase();
    return (
      agent.emailAgent.toLowerCase().includes(termLowerCase) || agent.emailAgent.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------

  public listeAgents(): Observable<Agent[]> {
    return this.httpClient.get<Agent[]>(`${this.urlServeur}/Agents`, { withCredentials: true });
  }

  public ajouterAgent(agent: Agent): Observable<Agent> {
    return this.httpClient.post<Agent>(`${this.urlServeur}/AjouterAgent`, agent, { withCredentials: true });
  }

  public modifierAgent(agent: Agent): Observable<Agent> {
    return this.httpClient.put<Agent>(`${this.urlServeur}/ModifierAgent`, agent, { withCredentials: true });
  }

  public supprimerAgentById(matriculeAgent: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerAgentById/${matriculeAgent}`, { withCredentials: true });
  }

  public recupererAgentById(matriculeAgent: string): Observable<Agent> {
    return this.httpClient.get<Agent>(`${this.urlServeur}/RecupererAgentById/${matriculeAgent}`, { withCredentials: true });
  }

}
