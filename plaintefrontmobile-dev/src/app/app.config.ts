import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AppConfig {
  constructor() {}

  public apiUrl = environment.apiURL
  public plainteService = 'api/'

  public groupes: [any]
  public qualites: [any]
  public legalForms: [any]
}
