import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { ApiService } from 'src/app/core/services/api.service'
import { Router } from '@angular/router'
import { HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public entities: any
  public pager: any
  public searchForm: FormGroup
  protected page: any = 0
  @Input() lenght
  @Input() columns
  @Input() size
  @Input() src
  @Input() path
  @Input() pathParams
  @Input() pathVals
  @Input() cle
  @Input() search: boolean
  @Input() view
  @Input() header = true
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.initSearchForm()

    this.getEntities(this.page)
    if (this.cle == null) {
      this.cle = 'id'
    }
  }

  getEntities(n?: any) {
    const body = {}
    if (n == null) {
      n = this.page
    }

    body['page'] = n
    if (this.lenght) {
      body['size'] = this.lenght
    }

    body['filter'] = this.searchForm.value

    this.apiService.post(this.src, body).subscribe((_response) => {
      this.entities = _response.body.entities
      this.pager = _response.body.pager
    })
  }

  get f() {
    return this.searchForm.controls
  }

  initSearchForm() {
    const group: any = {}

    this.columns.forEach((column) => {
      group[column] = new FormControl('')
    })
    this.searchForm = new FormGroup(group)

    this.setParamsPath()
  }

  ngEnableSearch() {
    if (this.search === true) {
      this.search = false
    } else {
      this.search = true
    }
  }

  ngSeach() {
    this.getEntities()
  }

  ngPaginate(pageNumber: any) {
    this.getEntities(pageNumber)
  }

  ngCall(url: string, param: string, value: string) {
    let params = new HttpParams()
    params = params.append(param, value)
    this.router.navigate([url, param])
  }

  ngNavigate(url: string, param: string) {
    this.router.navigate([url + '/' + param])
  }

  protected getNumber(num: any) {
    return new Array(num)
  }

  value(obj: any): string {
    return obj
  }

  ngValue(obj: any, key: string): string {
    if (obj == null) {
      return obj
    }
    if (!key.includes('.')) {
      return this.value(obj[key])
    } else {
      const keys = key.split('.')
      for (const k of keys) {
        obj = obj[k]
        if (obj == null) {
          return this.value(obj)
        }
      }
      return this.value(obj)
    }
  }

  setParamsPath() {
    if (this.pathParams != null) {
      for (let i = 0; i < this.pathParams.length; i++) {
        this.searchForm.addControl(
          this.pathParams[i],
          new FormControl(this.pathVals[i])
        )
      }
    }
  }

  getClassByStatus(key: string, value: string) {
    if (key === 'status') {
      switch (value) {
        case 'enabled':
          return 'badge badge-success'
        case 'disabled':
          return 'badge badge-secondary'
      }
    }
  }
}
