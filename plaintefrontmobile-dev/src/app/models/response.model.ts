export interface IApiRequest {
  requestID?: string
  timeStamp?: string
  canal?: string
  status?: string
  message?: string
  body?: any
}

export class ApiRequest implements IApiRequest {
  constructor(
    public requestID?: any,
    public timeStamp?: string,
    public canal?: string,
    public body?: string
  ) {}
}
