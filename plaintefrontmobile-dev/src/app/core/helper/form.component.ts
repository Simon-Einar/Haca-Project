import { OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms'
import { AlertService } from 'src/app/shared/alert/alert.service'
import { Injectable } from '@angular/core'
import { BaseComponent } from './base.component'
import { AppInjector } from 'src/app/services/app-injector.service'

@Injectable()
export class FormComponent extends BaseComponent implements OnInit {
  public frm: FormGroup
  public data: any
  public error: any
  public message: any
  public submitted: boolean
  public edit = false
  public activeTab
  public entity: any
  public id
  public boName
  public apiAction: any
  public loading: boolean

  protected formBuilder: FormBuilder
  protected alert: AlertService

  constructor(protected route: ActivatedRoute) {
    super()
    this.formBuilder = AppInjector.injector.get(FormBuilder)
    this.alert = AppInjector.injector.get(AlertService)
    this.id = this.route.snapshot.params['id']

  }

  ngOnInit() {
    this.initForm()
  }

  get f() {
    return this.frm.controls
  }

  setEdit(edit: boolean) {
    this.edit = edit
  }

  save() {
    this.submitted = true
    // stop here if form is invalid
    if (this.frm.invalid) {
      return
    }
    this.apiService
      .post(this.apiAction + '/save', this.frm.value)
      .subscribe((_response) => {
		if(_response.body && _response.body.id)
        	this.entity = _response.body
        this.setEdit(false)
        this.alert.success('Success')
      })
  }

  update() {
    this.submitted = true
    // stop here if form is invalid
    if (this.frm.invalid) {
      return
    }
    this.apiService
      .post(this.apiAction + '/update', this.frm.value)
      .subscribe((_response) => {
        this.entity = _response.body
        this.setEdit(false)
        this.alert.success('Success')
      })
  }

  initForm() {
    this.frm = new FormGroup({})

    this.frm = this.formBuilder.group({
      id: [''],
    })
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

}
