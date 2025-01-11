import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AccessDeniedComponent } from './access-denied/access-denied.component'
import { ErrorsRoutingModule } from './errors-routing.module'

@NgModule({
	imports: [
        CommonModule,
        ErrorsRoutingModule
	],
	declarations: [
		AccessDeniedComponent
	]
})
export class ErrorsModule { }
