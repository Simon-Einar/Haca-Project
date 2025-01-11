import { Component, OnInit } from '@angular/core'
import { Alert, AlertType } from 'src/app/models/alert'
import { AlertService } from 'src/app/shared/alert/alert.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alert: any
  subscription: Subscription

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert
    })
  }

  ngOnInit() {}
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe()
  }

  removeAlert() {
    this.alertService.clear()
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success'
      case AlertType.Error:
        return 'alert alert-danger'
      case AlertType.Info:
        return 'alert alert-info'
      case AlertType.Warning:
        return 'alert alert-warning'
    }
  }
}
