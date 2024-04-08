import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { LoginService } from 'src/app/services/login.service';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Component({
  selector: 'app-connexion',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {
  authStatus: string = "";
  utilisateur = new Utilisateur();

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  // validateUser(loginForm: NgForm) {
  //   this.loginService.validateLoginDetails(this.model).subscribe(
  //     responseData => {
  //       window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
  //       this.model = <any> responseData.body;
  //       this.model.authStatus = 'AUTH';
  //       window.sessionStorage.setItem("userdetails", JSON.stringify(this.model));
  //       let xsrf = getCookie('XSRF-TOKEN')!;
  //       window.sessionStorage.setItem("XSRF-TOKEN", xsrf);
  //       this.router.navigate(['accueil']);
  //     });

  // }

  validateUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.utilisateur).subscribe(
      responseData => {
        window.sessionStorage.setItem("Authorization", responseData.headers.get('Authorization')!);
        this.utilisateur = <any> responseData.body;
        this.utilisateur.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails", JSON.stringify(this.utilisateur));
        

        window.sessionStorage.setItem("XSRF-TOKEN", getCookie('XSRF-TOKEN')!);

  
        this.router.navigate(['accueil']);
      });
  }
  

}