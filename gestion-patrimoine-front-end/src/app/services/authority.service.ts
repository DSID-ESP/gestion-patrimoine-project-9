import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response.model';
import { Authorities } from '../model/authorities.model';



@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private urlServeur = environment.rooturl1;

  constructor(private httpClient: HttpClient) {}

  // RECHERCHER Authority SANS DOUBLONS
 public searchAuthorityListFilterDouble(term: string, listeAuthority: Authorities[]): Observable<Authorities[]> {

  if (term.length <= 1) {
    return of([]);
  }

  // Filtrer la liste d' authorities en fonction du terme de recherche
  const filteredAuthority: Authorities[] = listeAuthority.filter((authority) =>
  authority.codeAuthority.toString().includes(term.toLowerCase()) || authority.nameAuthority.toLowerCase().includes(term.toLowerCase())
  );

  // Utilisation de la méthode filter() pour éliminer les doublons
  const filteredAuthority1: Authorities[] = filteredAuthority.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.nameAuthority === item.nameAuthority || t.codeAuthority === item.codeAuthority
    ))
  );

  return of(filteredAuthority1);
}

// RECHERCHER UniteDouaniere
public searchAuthorityList(term: string, listeAuthority: Authorities[]): Observable<Authorities[]> {
  if (term.length <= 1) {
    return of([]);
  }

  // Filtrer la liste de UniteDouaniere en fonction du terme de recherche
  const filteredAuthority = listeAuthority.filter((authority) =>
    this.doesAuthorityMatchTerm(authority, term)
  );

  return of(filteredAuthority);
}

private doesAuthorityMatchTerm(authority: Authorities, term: string): boolean {
  // Vérifier si le terme de recherche correspond à n'importe lequel des attributs de Authority
  const termLowerCase = term.toLowerCase();
  return (
    authority.codeAuthority.toString().includes(termLowerCase) || authority.nameAuthority.toLowerCase().includes(termLowerCase)
    // Ajoutez d'autres attributs à vérifier si nécessaire
  );
}




  public listeAuthorities(): Observable<Authorities[]> {
    return this.httpClient.get<Authorities[]>(`${this.urlServeur}/Authorities`, { withCredentials: true });
  }

  public ajouterAuthority(authority: Authorities): Observable<Authorities> {
    return this.httpClient.post<Authorities>(`${this.urlServeur}/AjouterAuthority`, authority, { withCredentials: true });
  }

  public modifierAuthority(authority: Authorities): Observable<Authorities> {
    return this.httpClient.put<Authorities>(`${this.urlServeur}/ModifierAuthority`, authority, { withCredentials: true });
  }

  public supprimerAuthorityById(authorityId: number): Observable<CustomHttpRespone> {
    return this.httpClient.delete<CustomHttpRespone>(`${this.urlServeur}/SupprimerAuthorityById/${authorityId}`, { withCredentials: true });
  }

}
