import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public contact = {

    email:'info@haca.ma',
    logo:'assets/icon/image001.png',
    tele:'05375-79600',

  };
  constructor(private router:Router) { }

  navigate()
  {
    this.router.navigateByUrl('menu/plainte');
  }

  ngOnInit() {
  }

}
