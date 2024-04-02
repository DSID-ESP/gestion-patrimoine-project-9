import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/model/utilisateur.model';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {
  
  utilisateur = new Utilisateur();

  constructor() {
    
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.utilisateur = JSON.parse(sessionStorage.getItem('userdetails')!);
    }
  }

}