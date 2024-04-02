import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {
  
  constructor(private router : Router) { 
  }

  ngOnInit(): void {
    window.sessionStorage.setItem("userdetails", "");
    window.sessionStorage.setItem("XSRF-TOKEN", "");
    window.sessionStorage.setItem("Authorization", "");
    this.router.navigate(['/connexion']);
  }


}
