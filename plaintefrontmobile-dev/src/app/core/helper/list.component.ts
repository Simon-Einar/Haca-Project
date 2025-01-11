import { OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { AlertService } from 'src/app/shared/alert/alert.service'
import { Injectable } from '@angular/core'
import { BaseComponent } from './base.component'
import { AppInjector } from 'src/app/services/app-injector.service'
@Injectable()
export class ListComponent extends BaseComponent implements OnInit {
  public sizes = [10, 20, 30, 40, 50]
  public data: any
  public error: any
  public message: any
  public entities: any
  public pager: any
  public searchForm: FormGroup
  public page: any = 0
  public size: any = 10
  public currentSize: any = 10
  public src
  public filterColumns = ['id']
  public pathParams
  public dictionary = {}
  public search
  public loading

  protected router: Router
  protected formBuilder: FormBuilder
  protected alert: AlertService

  constructor() {
    super()
    this.router = AppInjector.injector.get(Router)
    this.formBuilder = AppInjector.injector.get(FormBuilder)
    this.alert = AppInjector.injector.get(AlertService)
  }

  ngOnInit() {
    this.initSearchForm()
    this.getEntities()
  }

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

  setPage(n?: any) {
      this.getEntities(n.offset)
  }

  getEntities(n?: any) {
    this.loading = true
    const body = {}
    if (n != null) {
      this.page = n
    }

    body['size'] = this.size
    body['page'] = this.page
    body['filter'] = this.searchForm.value
    this.apiService.post(this.src, body).subscribe(
      (_response) => {
        if (_response.body) {
          console.log(Response);
          this.entities = _response.body.entities
          this.pager = _response.body.pager
          this.page = this.pager.page
          this.currentSize = this.size
          this.loading = false
        }
        this.loading = false
      },
      (error) => {}
    )
  }

  get f() {
    return this.searchForm.controls
  }

  initSearchForm() {
    const group: any = {}

    this.filterColumns.forEach((column) => {
      if (column.startsWith('_')) {
        group[column] = new FormControl(' ')
      } else {
        group[column] = new FormControl(null)
      }
    })
    this.searchForm = new FormGroup(group)
  }
  public ngSeach() {
    this.entities = null
    this.getEntities()
  }
  public ngRefresh() {
    this.searchForm.reset()
    this.getEntities()
  }

  protected getNumber(num: any) {
    return new Array(num)
  }

  ngPaginate(pageNumber: any) {
    this.getEntities(pageNumber)
  }

  setSize(event) {
    this.size = Number(event.target.value)
    this.getEntities(this.page)
  }

}
