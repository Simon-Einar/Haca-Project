import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { AppConfig } from '../app.config';
import { FormComponent } from '../core/helper/form.component';
import { ListComponent } from '../core/helper/list.component';
import { ApiService } from '../core/services/api.service';
import { AppInjector } from '../services/app-injector.service';
import {LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Device } from '@awesome-cordova-plugins/device/ngx';


@Component({
  selector: 'app-plainte',
  templateUrl: './plainte.page.html',
  styleUrls: ['./plainte.page.scss'],
})
export class PlaintePage {
  public apiService: ApiService;
  private action : string;
  private src : string;
  private config: AppConfig;
  private entity : any;
  public services: any;
  public typePlaintes: any;
  private src1: any;
  formattedString = '';
  showPicker = false;
  dateValue ;
  constructor(public loadingController: LoadingController,private router:Router,private device: Device)
  {
    this.apiService = AppInjector.injector.get(ApiService);
    this.config = AppInjector.injector.get(AppConfig)
    console.log('Device UUID is: ' + this.device.cordova);
  }

  async onAddPlainte(addForm: NgForm)
  {
    await this.showLoading();
    console.log('onAddPainte called');
    console.log(addForm)
    // stop here if form is invalid
    if (addForm.invalid) {
      return
    }
    addForm.value.uuid = this.device.uuid;
    addForm.value.cordova = this.device.cordova;
    addForm.value.model = this.device.model;
    addForm.value.platform = this.device.platform;
    addForm.value.version = this.device.version;
    addForm.value.manufacturer = this.device.manufacturer;
    addForm.value.isVirtual = this.device.isVirtual;
    addForm.value.serial = this.device.serial;

    this.apiService
      .post(this.action + '/save', addForm.value)
      .subscribe((_response) => {
		if(_response.body && _response.body.id)
        	this.entity = _response.body
          console.log(this.entity)
          this.loadingController.dismiss();
          this.router.navigateByUrl('menu/historique');
      }, (error)=>{
        this.loadingController.dismiss();
      });

  }

  async showLoading()
  {
    const loading = await this.loadingController.create({
    message: 'Please wait...'
    });
    loading.present();
  }

  ionViewWillEnter()
  {
    this.action = this.config.plainteService+"plainte";
    this.src = this.config.plainteService+"service";
    this.src1= this.config.plainteService+"typePlainte";
    this.apiService.post(this.src+'/list',{}).subscribe( response => {
      if(response && response.body){
       this.services=response.body.entities;
       console.log(this.services);
      }
    })
    this.apiService.post(this.src1+'/list',{}).subscribe( response => {
      if(response && response.body){
       this.typePlaintes=response.body.entities;
       console.log(this.services);
      }
    })
    this.setToday();
  }
  setToday() {
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+ 'T09:00:00.000Z'), 'dd/MM/yyyy, HH:mm')
  }
  dateChanged(value)
  {
    console.log('dateChanged '+ this.dateValue);
    if(value){
      this.dateValue = value;
      this.formattedString = format(parseISO(value),'dd/MM/yyyy, HH:mm')
      console.log(this.dateValue);
    }
  }



}

