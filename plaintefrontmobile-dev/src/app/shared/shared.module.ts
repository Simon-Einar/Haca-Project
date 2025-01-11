import { NumbersOnlyDirective } from './directives/onlynumbers.directive';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertComponent } from './alert/alert.component'
import { ModalComponent } from './modal/modal.component'
import { LoadingComponent } from './loading/loading.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TableComponent } from './table/table.component'
import { SortByPipe } from './pipes/sort.pipe'
import { FilterPipe } from './pipes/filter.pipe'
import { PureFilterPipe } from './pipes/pure-filter.pipe'
import { KeysPipe } from './pipes/keys-pipe'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

@NgModule({
  declarations: [
    AlertComponent,
    ModalComponent,
    TableComponent,
    SortByPipe,
    KeysPipe,
    FilterPipe,
    PureFilterPipe,
    NumbersOnlyDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
  ],
  exports: [
    AlertComponent,
    ModalComponent,
    TableComponent,
    SortByPipe,
    KeysPipe,
    FilterPipe,
    PureFilterPipe,
    LoadingComponent,
    NumbersOnlyDirective
  ],

})
export class SharedModule {}
