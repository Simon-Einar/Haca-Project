export class Alert {
  type: AlertType
  reason: string
  message: string
  keepAfterRouteChange: boolean

  constructor(message: string, type: AlertType) {
    this.type = type
    this.message = message
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
