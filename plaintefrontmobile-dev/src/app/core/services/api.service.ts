import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { AppConfig } from 'src/app/app.config'
import { Observable, of } from 'rxjs'
import { delay, switchMap } from 'rxjs/operators'
import { ApiRequest } from 'src/app/models/request.model'
import { v4 as uuidv4 } from 'uuid'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected http: HttpClient, protected config: AppConfig) {}

  // action : le path de l’url du service backend
  // params : des paramétrés de la requête http.
  get(action: string, params: HttpParams): any {
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.http.get<any>(this.config.apiUrl + action, { headers, params })
  }

  download(url: string): Observable<any> {
    return this.http
      .get(this.config.apiUrl + url, { responseType: 'blob' })
      .pipe(switchMap((response) => this.readFile(response)))
  }


  // action : le path de l’url du service backend
  // body: le body du requet post
  // params : des paramétrés de la requête http.
  public post(action: string, body: any): any {
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.http.post<any>(
      this.config.apiUrl + action,
      new ApiRequest(uuidv4(), Date.now(), 'WEB', body),
      { headers }
    )
  }

  // action : le path de l’url du service backend
  // body: le body du requet post
  // params : des paramétrés de la requête http.
  public postDebug(uri: string, body: any): any {
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.http.post<any>(
      uri,
      new ApiRequest(uuidv4(), Date.now(), 'WEB', body),
      { headers }
    )
  }


  // action : le path de l’url du service backend
  // body: le body du requet post
  // params : des paramétrés de la requête http.
  public upload(action: string, body: any): any {
    return this.http.post<any>(this.config.apiUrl + action, body)
  }

  // action : le path de l’url du service backend
  // params : des paramétrés de la requête http.
  delete(action: string, params: HttpParams): any {
    const headers = new HttpHeaders().set('content-type', 'application/json')
    return this.http.delete<any>(this.config.apiUrl + action, {
      headers,
      params,
    })
  }

  private readFile(blob: Blob): Observable<string> {
    return new Observable<any>((obs) => {
      const reader = new FileReader()

      reader.onerror = (err) => obs.error(err)
      reader.onabort = (err) => obs.error(err)
      reader.onload = () => obs.next(reader.result)
      reader.onloadend = () => obs.complete()

      return reader.readAsDataURL(blob)
    })
  }
}
