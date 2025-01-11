import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menus = [
    {title:'Accueil', url:'menu/home', icone:'home' },
    {title:'Plainte', url:'menu/plainte', icone:'reader-outline'},
    {title:'Mes plaintes', url:'menu/historique', icone:'time-outline'}
  ];
  constructor(private router:Router) { }

  ngOnInit() {
  }
  onMenuItem(m)
  {
    this.router.navigateByUrl(m.url);
  }

}
