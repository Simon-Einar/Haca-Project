import { NgModule } from '@angular/core'
import {
  Routes,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkWithHref,
  RouterLinkActive,
} from '@angular/router'
import { AccessDeniedComponent } from './access-denied/access-denied.component'

const routes: Routes = [
  { path: '', component: AccessDeniedComponent }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
export const ROUTER_DIRECTIVES = [
  RouterOutlet,
  RouterLink,
  RouterLinkWithHref,
  RouterLinkActive,
]
