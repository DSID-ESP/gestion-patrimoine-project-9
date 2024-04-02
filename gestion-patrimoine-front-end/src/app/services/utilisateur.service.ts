import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/utilisateur.model';
import { CustomHttpRespone } from '../model/custom-http-response.model';



@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}


  // ----------------------------------------------------------------------------
  // RECHERCHER PRESTATAIRES SANS DOUBLONS
  public searchUserListFilterDouble(term: string, listeUsers: Utilisateur[]): Observable<Utilisateur[]> {

    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de Users en fonction du terme de recherche
    const filteredUsers: Utilisateur[] = listeUsers.filter((users) =>
    users.matriculeAgent.numeroTelephoneAgent.toString().includes(term.toLowerCase()) || users.matriculeAgent.emailAgent.toLowerCase().includes(term.toLowerCase()));

    // Utilisation de la méthode filter() pour éliminer les doublons
    const filteredUsers1: Utilisateur[] = filteredUsers.filter((item, index, self) =>
      index === self.findIndex((t) => (
          t.matriculeAgent.emailAgent === item.matriculeAgent.emailAgent || t.matriculeAgent.numeroTelephoneAgent === item.matriculeAgent.numeroTelephoneAgent
      ))
    );

    return of(filteredUsers1);
  }

  // RECHERCHER User
  public searchUsersList(term: string, listeUsers: Utilisateur[]): Observable<Utilisateur[]> {
    if (term.length <= 1) {
      return of([]);
    }

    // Filtrer la liste de Prestataires en fonction du terme de recherche
    const filteredUsers = listeUsers.filter((users) =>
      this.doesUsersMatchTerm(users, term)
    );

    return of(filteredUsers);
  }

  private doesUsersMatchTerm(users: Utilisateur, term: string): boolean {
    // Vérifier si le terme de recherche correspond à n'importe lequel des attributs du prestataires
    const termLowerCase = term.toLowerCase();
    return (
      users.matriculeAgent.emailAgent.toLowerCase().includes(termLowerCase) || users.matriculeAgent.emailAgent.toLowerCase().includes(termLowerCase)
      // Ajoutez d'autres attributs à vérifier si nécessaire
    );
  }
  // ----------------------------------------------------------------------------

  public listeUsers(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${this.urlServeur}/Users`, { withCredentials: true });
  }

  public ajouterUser(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${this.urlServeur}/AjouterUser`, user, { withCredentials: true });
  }

  public modifierUser(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.urlServeur}/ModifierUser`, user, { withCredentials: true });
  }

  public supprimerUserById(userName: string): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerUserById/${userName}`, { withCredentials: true });
  }

  public recupererUserByUserName(userName: string): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.urlServeur}/RecupererUserByUserName/${userName}`, { withCredentials: true });
  }

}
