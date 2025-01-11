import { OnInit } from '@angular/core'
import { ApiService } from 'src/app/core/services/api.service'
import { Injectable } from '@angular/core'
import { Location } from '@angular/common'
import { AppConfig } from 'src/app/app.config'
import { AppInjector } from 'src/app/services/app-injector.service'

@Injectable()
export class BaseComponent implements OnInit {

	public swal: any = window['swal']
	public apiService: ApiService
	public location: Location
	public config: AppConfig
	public activeTab = 1

	constructor() {
		this.apiService = AppInjector.injector.get(ApiService)
		this.location = AppInjector.injector.get(Location)
		this.config = AppInjector.injector.get(AppConfig)
	}

	ngOnInit() { }

	ngValue(obj: any, key: string): string {
		if (obj == null) {
			return obj
		}

		if (!key.includes('.')) {
			return obj[key]
		} else {
			const keys = key.split('.')
			for (const k of keys) {
				obj = obj[k]
				if (obj == null) {
					return obj
				}
			}
			return obj
		}
	}

	ngBack() {
		this.location.back()
	}

}
