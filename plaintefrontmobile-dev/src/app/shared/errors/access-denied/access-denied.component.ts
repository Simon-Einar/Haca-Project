import { OnInit, Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'access-denied',
    template: `
      <div style="text-align: center;">
        <h3 class="py-5">  Access-denied  !  
        <button class="btn btn-info" (click)="goback()" title="Go back"> 
        <i class="fa fa-arrow-left"></i>
        </button> 
        </h3>
        <p> - You don't have permission to perform this action or access this resource </p>
      </div>
    `
  })

export class AccessDeniedComponent implements OnInit {
    
    constructor(private _location: Location) {

    }

    ngOnInit(): void {
    }


    goback() {
      this._location.back();
    }
}