export interface IApiRequest {
  requestID?: string
  timeStamp?: number
  canal?: string
  body?: any
}

export class ApiRequest implements IApiRequest {
  constructor(
    public requestID?: string,
    public timeStamp?: number,
    public canal?: string,
    public body?: any
  ) {
    this.body = body
  }
}
