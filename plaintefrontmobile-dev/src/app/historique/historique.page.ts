import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ListComponent } from '../core/helper/list.component';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage extends ListComponent {

  constructor(private  httpClinet:HttpClient)
  {
     super();
     this.filterColumns =[
      'uuid',
     ];
     this.initSearchForm();
     this.src = this.config.plainteService+"plainte/search";
     this.searchForm.controls['uuid'].setValue('Uuid');
  }


  ionViewWillEnter(){
    this.getEntities();
  }

}
