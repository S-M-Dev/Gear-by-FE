import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'gear-by-card-form-wrapper',
  templateUrl: './card-form-wrapper.component.html',
  styleUrls: ['./card-form-wrapper.component.scss']
})
export class CardFormWrapperComponent {
  @Input() public formGroup: FormGroup;
  @Output() public submitForm = new EventEmitter<unknown>();
}
