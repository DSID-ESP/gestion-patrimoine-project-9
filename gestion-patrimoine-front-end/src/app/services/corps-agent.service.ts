import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { CorpsAgent } from '../model/corps-agent.model';


@Injectable({
  providedIn: 'root'
})
export class CorpsAgentService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  public listeCorpsAgents(): Observable<CorpsAgent[]> {
    return this.httpClient.get<CorpsAgent[]>(`${this.urlServeur}/CorpsAgents`, { withCredentials: true });
  }

  public ajouterCorpsAgent(CorpsAgent: CorpsAgent): Observable<CorpsAgent> {
    return this.httpClient.post<CorpsAgent>(`${this.urlServeur}/AjouterCorpsAgent`, CorpsAgent, { withCredentials: true });
  }

  public modifierCorpsAgent(CorpsAgent: CorpsAgent): Observable<CorpsAgent> {
    return this.httpClient.put<CorpsAgent>(`${this.urlServeur}/ModifierCorpsAgent`, CorpsAgent, { withCredentials: true });
  }

  public supprimerCorpsAgent(codeCorpsAgent: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerCorpsAgentByCorpsAgentId/${codeCorpsAgent}`, { withCredentials: true });
  }


}
