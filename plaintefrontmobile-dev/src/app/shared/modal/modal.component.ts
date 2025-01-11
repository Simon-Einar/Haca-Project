import { Component, OnInit, Input} from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  @Input() public title
  @Input() public form: FormGroup

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  dismiss(): void {
    this.activeModal.dismiss()
  }

  save() {
    this.activeModal.close(this.form.getRawValue())
  }
}
