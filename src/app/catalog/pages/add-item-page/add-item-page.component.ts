import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartsService } from '../../../core/services/parts.service';

@Component({
  selector: 'gear-by-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.scss'],
})
export class AddItemPageComponent {
  public itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private partsService: PartsService,
    private router: Router,
  ) {
    this.itemForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      carModel: [null, Validators.required],
      carMark: [null, Validators.required],
      amount: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  submit() {
    this.partsService.addItem(this.itemForm.value).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
