import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppInjector } from './services/app-injector.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './shared/alert/alert.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
              AlertService,
              Device
    ],
  bootstrap: [AppComponent],
})

export class AppModule
{
  constructor(injector : Injector)
  {
    AppInjector.injector= injector
  }
}
