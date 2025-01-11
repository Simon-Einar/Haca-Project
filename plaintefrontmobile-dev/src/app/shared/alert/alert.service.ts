import { Injectable, NgModule } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { Observable, Subject } from 'rxjs'

import { Alert, AlertType } from 'src/app/models/alert'

@Injectable()
@NgModule()
export class AlertService {
  private subject = new Subject<Alert>()
  private keepAfterRouteChange = false

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false
        } else {
          // clear alert messages
          this.clear()
        }
      }
    })
  }

  // subscribe to alerts
  getAlert(): Observable<any> {
    return this.subject.asObservable()
  }

  // showe success notification
  success(message: string) {
    this.alert(new Alert(message, AlertType.Success))
  }

  // showe error notification
  error(message: string) {
    this.alert(new Alert(message, AlertType.Error))
  }

  // showe information notification
  info(message: string) {
    this.alert(new Alert(message, AlertType.Info))
  }

  // showe warning notification
  warn(message: string) {
    this.alert(new Alert(message, AlertType.Warning))
  }

  // main alert method
  alert(alert: Alert) {
    this.keepAfterRouteChange = alert.keepAfterRouteChange
    this.subject.next(alert)
  }

  // clear alerts
  clear() {
    this.subject.next()
  }
}
